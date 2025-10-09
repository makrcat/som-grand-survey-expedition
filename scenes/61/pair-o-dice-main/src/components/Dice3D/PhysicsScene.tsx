import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import * as CANNON from "cannon-es";
import { getDieConfig } from "./DiceFactory";
import type { DieType } from "./DiceFactory";


type DiceSpec = { id: string; sides: number };
type Props = {
  dice: DiceSpec[];
  onSettled: (values: number[]) => void;
  showWalls?: boolean;
};

export default function PhysicsScene({
  dice,
  onSettled,
  showWalls = false,
}: Props) {
  // Auto-size box from dice count
  const { halfW, halfD, floorY, wallH } = useMemo(() => {
    const n = Math.max(0, dice.length);
    // Base size for up to ~6 dice, then grow sublinearly
    const base = 3.5; // half-size at low counts
    const growth = Math.sqrt(n) * 0.7; // sublinear growth
    const halfW = base + growth; // X
    const halfD = base + growth; // Z
    const floorY = -1;
    // Taller walls for large piles
    const wallH = 2.2 + Math.min(2.8, Math.log2(Math.max(2, n)) * 0.6);
    return { halfW, halfD, floorY, wallH };
  }, [dice.length]);

  // Camera distance helper: push out a bit for larger box
  const camDistance = useMemo(() => {
    const size = Math.max(halfW, halfD);
    return 5 + size * 1.4; // distance from origin
  }, [halfW, halfD]);

  return (
    <div
      style={{
        width: "100%",
        height: 420,
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <Canvas shadows camera={{ position: [camDistance, camDistance, camDistance * 1.5], fov: 45 }}>
        <color attach="background" args={["#0b2e2a"]} />
        <hemisphereLight
          intensity={0.7}
          color={"#c0fff0"}
          groundColor={"#003a2f"}
        />
        <directionalLight
          position={[10, 12, 6]}
          castShadow
          intensity={1.25}
          color={"#ffd166"}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <Environment preset="sunset" />

        <PhysicsCore
          dice={dice}
          onSettled={onSettled}
          boxHalfW={halfW}
          boxHalfD={halfD}
          boxFloorY={floorY}
          wallH={wallH}
        />

        {/* Visual floor slightly larger than box */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, floorY, 0]}
          receiveShadow
        >
          <planeGeometry args={[halfW * 2 + 4, halfD * 2 + 4]} />
          <meshStandardMaterial color={"#0f3b36"} />
        </mesh>

        {showWalls && (
          <WallsVisual
            boxHalfW={halfW}
            boxHalfD={halfD}
            boxFloorY={floorY}
            wallH={wallH}
          />
        )}

        <AutoOrbitTarget target={[0, floorY + 0.5, 0]} />
        <OrbitControls
          enablePan
          enableZoom
          enableRotate
          mouseButtons={{
            LEFT: THREE.MOUSE.ROTATE,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: THREE.MOUSE.PAN,
          }}
          minDistance={Math.max(5, camDistance * 0.6)}
          maxDistance={Math.max(10, camDistance * 2.2)}
          maxPolarAngle={Math.PI * 0.49}
        />
      </Canvas>
    </div>
  );
}

// Smoothly update controls target when box changes
function AutoOrbitTarget({ target }: { target: [number, number, number] }) {
  const { controls } = useThree() as any;
  const tgt = useMemo(
    () => new THREE.Vector3(target[0], target[1], target[2]),
    [target],
  );
  useFrame(() => {
    if (controls && controls.target) {
      (controls.target as THREE.Vector3).lerp(tgt, 0.08);
      controls.update?.();
    }
  });
  return null;
}

function WallsVisual({
  boxHalfW,
  boxHalfD,
  boxFloorY,
  wallH,
}: {
  boxHalfW: number;
  boxHalfD: number;
  boxFloorY: number;
  wallH: number;
}) {
  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#1ac9a0"),
        transparent: true,
        opacity: 0.12,
        roughness: 0.2,
        metalness: 0.1,
      }),
    [],
  );
  const thick = 0.1;
  const h = wallH;
  const y = boxFloorY + h / 2;
  return (
    <group>
      <mesh position={[boxHalfW + thick / 2, y, 0]} castShadow>
        <boxGeometry args={[thick, h, boxHalfD * 2 + thick * 2]} />
        <primitive object={mat} attach="material" />
      </mesh>
      <mesh position={[-boxHalfW - thick / 2, y, 0]} castShadow>
        <boxGeometry args={[thick, h, boxHalfD * 2 + thick * 2]} />
        <primitive object={mat} attach="material" />
      </mesh>
      <mesh position={[0, y, boxHalfD + thick / 2]} castShadow>
        <boxGeometry args={[boxHalfW * 2 + thick * 2, h, thick]} />
        <primitive object={mat} attach="material" />
      </mesh>
      <mesh position={[0, y, -boxHalfD - thick / 2]} castShadow>
        <boxGeometry args={[boxHalfW * 2 + thick * 2, h, thick]} />
        <primitive object={mat} attach="material" />
      </mesh>
    </group>
  );
}

function PhysicsCore({
  dice,
  onSettled,
  boxHalfW,
  boxHalfD,
  boxFloorY,
  wallH,
}: {
  dice: { id: string; sides: number }[];
  onSettled: (values: number[]) => void;
  boxHalfW: number;
  boxHalfD: number;
  boxFloorY: number;
  wallH: number;
}) {
  const worldRef = useRef<CANNON.World | null>(null);
  const bodiesRef = useRef<CANNON.Body[]>([]);
  const meshesRef = useRef<THREE.Object3D[]>([]);
  const configsRef = useRef<ReturnType<typeof getDieConfig>[]>([]);

  const matGroundRef = useRef<CANNON.Material | null>(null);
  const matDiceRef = useRef<CANNON.Material | null>(null);
  const matWallRef = useRef<CANNON.Material | null>(null);

  // control flags
  const needThrowRef = useRef(true);
  const reportedRef = useRef(false);
  const settleFramesRef = useRef(0);

  // velocity settle thresholds
  const LIN_EPS = 0.05;
  const ANG_EPS = 0.05;

  // build world and walls; rebuild if box dimensions change
  useEffect(() => {
    // Dispose previous world if exists
    worldRef.current = null;
    bodiesRef.current = [];
    meshesRef.current = [];
    configsRef.current = [];

    const world = new CANNON.World({
      gravity: new CANNON.Vec3(0, -9.82, 0),
      allowSleep: true,
    });
    const solver = new CANNON.GSSolver();
    solver.iterations = 12;
    world.solver = solver;
    world.broadphase = new CANNON.NaiveBroadphase();

    const matGround = new CANNON.Material("ground");
    const matDice = new CANNON.Material("dice");
    const matWall = new CANNON.Material("wall");

    world.addContactMaterial(
      new CANNON.ContactMaterial(matGround, matDice, {
        friction: 0.25,
        restitution: 0.22,
      }),
    );
    world.addContactMaterial(
      new CANNON.ContactMaterial(matWall, matDice, {
        friction: 0.22,
        restitution: 0.18,
      }),
    );

    // Floor
    const floor = new CANNON.Body({
      type: CANNON.Body.STATIC,
      shape: new CANNON.Plane(),
      material: matGround,
    });
    floor.position.set(0, boxFloorY, 0);
    floor.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
    world.addBody(floor);

    // Walls (inward normals)
    const wallY = boxFloorY + wallH / 2;
    const wallPX = new CANNON.Body({
      type: CANNON.Body.STATIC,
      shape: new CANNON.Plane(),
      material: matWall,
    });
    wallPX.position.set(boxHalfW, wallY, 0);
    wallPX.quaternion.setFromEuler(0, -Math.PI / 2, 0);
    world.addBody(wallPX);

    const wallNX = new CANNON.Body({
      type: CANNON.Body.STATIC,
      shape: new CANNON.Plane(),
      material: matWall,
    });
    wallNX.position.set(-boxHalfW, wallY, 0);
    wallNX.quaternion.setFromEuler(0, Math.PI / 2, 0);
    world.addBody(wallNX);

    const wallPZ = new CANNON.Body({
      type: CANNON.Body.STATIC,
      shape: new CANNON.Plane(),
      material: matWall,
    });
    wallPZ.position.set(0, wallY, boxHalfD);
    wallPZ.quaternion.setFromEuler(0, Math.PI, 0);
    world.addBody(wallPZ);

    const wallNZ = new CANNON.Body({
      type: CANNON.Body.STATIC,
      shape: new CANNON.Plane(),
      material: matWall,
    });
    wallNZ.position.set(0, wallY, -boxHalfD);
    world.addBody(wallNZ);

    worldRef.current = world;
    matGroundRef.current = matGround;
    matDiceRef.current = matDice;
    matWallRef.current = matWall;

    // After rebuilding box, we need a fresh throw for current dice
    needThrowRef.current = true;
    reportedRef.current = false;
    settleFramesRef.current = 0;
  }, [boxHalfW, boxHalfD, boxFloorY, wallH]);

  // sync bodies with dice length/types
  useEffect(() => {
    const world = worldRef.current;
    if (!world) return;

    if (dice.length < bodiesRef.current.length) {
      for (let i = dice.length; i < bodiesRef.current.length; i++) {
        world.removeBody(bodiesRef.current[i]);
      }
      bodiesRef.current.length = dice.length;
      meshesRef.current.length = dice.length;
      configsRef.current.length = dice.length;
    }

    for (let i = 0; i < dice.length; i++) {
      const sides = normalizeSides(dice[i].sides);
      const cfg = getDieConfig(sides);
      if (!bodiesRef.current[i]) {
        const body = new CANNON.Body({
          mass: 1,
          material: matDiceRef.current ?? undefined,
          linearDamping: 0.24,
          angularDamping: 0.32,
        });
        body.sleepSpeedLimit = 0.12;
        body.sleepTimeLimit = 0.5;
        const shape = cfg.createShape();
        body.addShape(shape);
        world.addBody(body);
        bodiesRef.current[i] = body;
        meshesRef.current[i] = new THREE.Object3D();
        configsRef.current[i] = cfg;
      } else {
        const body = bodiesRef.current[i];
        const need = configsRef.current[i]?.sides !== cfg.sides;
        if (need) {
          while (body.shapes.length) body.removeShape(body.shapes[0]);
          body.addShape(cfg.createShape());
          configsRef.current[i] = cfg;
        }
      }
    }

    needThrowRef.current = true;
    reportedRef.current = false;
    settleFramesRef.current = 0;
  }, [dice.map((d) => String(d.sides)).join("|"), dice.length]);

  // roll trigger on id changes
  useEffect(() => {
    needThrowRef.current = true;
    reportedRef.current = false;
    settleFramesRef.current = 0;
  }, [dice.map((d) => d.id).join("|")]);

  useFrame((_, dt) => {
    const world = worldRef.current;
    if (!world) return;

    const clamped = isFinite(dt) ? Math.min(1 / 30, Math.max(1 / 120, dt)) : 1 / 60;
    world.step(1 / 60, clamped, 3);

    if (needThrowRef.current) {
      const rng = (min: number, max: number) => min + Math.random() * (max - min);
      const point = new CANNON.Vec3();

      // Spawn bounds shrink a touch near walls to avoid clipping
      const margin = 0.8;
      for (let i = 0; i < bodiesRef.current.length; i++) {
        const b = bodiesRef.current[i];
        b.wakeUp();

        const x = rng(-boxHalfW + margin, boxHalfW - margin);
        const z = rng(-boxHalfD + margin, boxHalfD - margin);
        const y = boxFloorY + rng(1.6, 2.3);

        b.position.set(x, y, z);
        b.velocity.set(0, 0, 0);
        b.angularVelocity.set(0, 0, 0);
        b.quaternion.setFromEuler(
          rng(0, Math.PI * 2),
          rng(0, Math.PI * 2),
          rng(0, Math.PI * 2),
        );

        const impulse = new CANNON.Vec3(
          rng(3.4, 6.4),
          rng(2.6, 5.4),
          rng(3.4, 7.4),
        );
        b.applyImpulse(impulse, b.position);

        point.set(
          x + rng(-0.35, 0.35),
          y + 0.35,
          z + rng(-0.35, 0.35),
        );
        const spin = new CANNON.Vec3(
          rng(-3.6, 3.6),
          rng(-4.2, 4.2),
          rng(-3.6, 3.6),
        );
        b.applyImpulse(spin, point);
      }

      needThrowRef.current = false;
      reportedRef.current = false;
      settleFramesRef.current = 0;
    }

    // sync visuals
    for (let i = 0; i < bodiesRef.current.length; i++) {
      const b = bodiesRef.current[i];
      const o = meshesRef.current[i];
      if (!b || !o) continue;
      o.position.set(b.position.x, b.position.y, b.position.z);
      o.quaternion.set(
        b.quaternion.x,
        b.quaternion.y,
        b.quaternion.z,
        b.quaternion.w,
      );
    }

    // settle detection via low velocities
    if (bodiesRef.current.length) {
      const allStill = bodiesRef.current.every((b) => {
        const lv = b.velocity;
        const av = b.angularVelocity;
        const linMag = Math.hypot(lv.x, lv.y, lv.z);
        const angMag = Math.hypot(av.x, av.y, av.z);
        return linMag < LIN_EPS && angMag < ANG_EPS;
      });

      if (allStill) {
        settleFramesRef.current++;
      } else {
        settleFramesRef.current = 0;
      }

      if (!reportedRef.current && settleFramesRef.current >= 8) {
        reportedRef.current = true;
        const vals = bodiesRef.current.map((b, i) =>
          configsRef.current[i].readTop(b.quaternion),
        );
        onSettled(vals);
      }
    }
  });

  return (
    <group>
      {dice.map((d, i) => {
        const sides = normalizeSides(d.sides);
        const cfg = getDieConfig(sides);
        const Render = cfg.Render;
        return (
          <group
            key={d.id}
            ref={(g) => {
              if (g) meshesRef.current[i] = g;
            }}
          >
            <Render />
          </group>
        );
      })}
    </group>
  );
}

function normalizeSides(n: number): DieType {
  const supported: DieType[] = [4, 6, 8, 10, 12, 20];
  return (supported.includes(n as DieType) ? n : 6) as DieType;
}
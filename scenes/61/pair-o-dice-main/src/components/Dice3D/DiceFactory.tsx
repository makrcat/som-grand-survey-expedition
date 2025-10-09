import * as THREE from "three";
import * as CANNON from "cannon-es";
import { Text } from "@react-three/drei";
import { useMemo, type JSX } from "react";
import { ConvexHull } from "three/examples/jsm/math/ConvexHull.js";

export type DieType = 4 | 6 | 8 | 10 | 12 | 20;

export type DieConfig = {
  sides: DieType;
  Render: (props: { color?: string }) => JSX.Element;
  createShape: () => CANNON.Shape;
  readTop: (q: CANNON.Quaternion) => number;
};

function makeMaterial(color: string) {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color),
    metalness: 0.25,
    roughness: 0.35,
    clearcoat: 0.4,
    clearcoatRoughness: 0.3,
  });
}

const pipMat = new THREE.MeshStandardMaterial({
  color: new THREE.Color("#ffffff"),
  metalness: 0.15,
  roughness: 0.45,
  emissive: new THREE.Color("#eafff8"),
  emissiveIntensity: 0.05,
});

function D6Pips() {
  const r = 0.07;
  const s = 0.33;
  const makePip = (key: number, position: THREE.Vector3) => (
    <mesh key={key} position={position} material={pipMat} castShadow>
      <sphereGeometry args={[r, 16, 16]} />
    </mesh>
  );
  const nodes: JSX.Element[] = [];
  let key = 0;
  type Face = { center: THREE.Vector3; u: THREE.Vector3; v: THREE.Vector3; layout: [number, number][] };
  const faces: Face[] = [
    { center: new THREE.Vector3(0, 0.5, 0), u: new THREE.Vector3(1, 0, 0), v: new THREE.Vector3(0, 0, 1), layout: [[0, 0]] }, // +Y => 1
    {
      center: new THREE.Vector3(0, -0.5, 0),
      u: new THREE.Vector3(1, 0, 0),
      v: new THREE.Vector3(0, 0, -1),
      layout: [
        [-s, -s],
        [0, -s],
        [s, -s],
        [-s, s],
        [0, s],
        [s, s],
      ],
    }, // -Y => 6
    { center: new THREE.Vector3(0.5, 0, 0), u: new THREE.Vector3(0, 0, 1), v: new THREE.Vector3(0, 1, 0), layout: [[-s, -s], [0, 0], [s, s]] }, // +X => 3
    { center: new THREE.Vector3(-0.5, 0, 0), u: new THREE.Vector3(0, 0, -1), v: new THREE.Vector3(0, 1, 0), layout: [[-s, -s], [-s, s], [s, -s], [s, s]] }, // -X => 4
    {
      center: new THREE.Vector3(0, 0, 0.5),
      u: new THREE.Vector3(1, 0, 0),
      v: new THREE.Vector3(0, 1, 0),
      layout: [
        [-s, -s],
        [s, s],
        [0, 0],
        [-s, s],
        [s, -s],
      ],
    }, // +Z => 5
    { center: new THREE.Vector3(0, 0, -0.5), u: new THREE.Vector3(-1, 0, 0), v: new THREE.Vector3(0, 1, 0), layout: [[-s, -s], [s, s]] }, // -Z => 2
  ];
  for (const f of faces) {
    for (const [u, v] of f.layout) {
      const pos = f.center
        .clone()
        .add(f.u.clone().multiplyScalar(u))
        .add(f.v.clone().multiplyScalar(v))
        .addScaledVector(f.center.clone().normalize(), 0.001);
      nodes.push(makePip(key++, pos));
    }
  }
  return <group>{nodes}</group>;
}

export function D6Render({ color = "#12bfa1" }: { color?: string }) {
  const bodyGeo = useMemo(() => {
    const g = new THREE.BoxGeometry(1, 1, 1);
    g.computeVertexNormals();
    return g;
  }, []);
  const bodyMat = useMemo(() => makeMaterial(color), [color]);
  return (
    <group>
      <mesh geometry={bodyGeo} material={bodyMat} castShadow receiveShadow />
      <D6Pips />
    </group>
  );
}

function FaceText({
  text,
  position,
  normal,
  scale = 0.35,
}: {
  text: string;
  position: THREE.Vector3;
  normal: THREE.Vector3;
  scale?: number;
}) {
  const quat = new THREE.Quaternion();
  quat.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal.clone().normalize());
  return (
    <group position={position} quaternion={quat}>
      <Text
        fontSize={scale}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#003a2f"
      >
        {text}
      </Text>
    </group>
  );
}

function cannonFromBufferGeometry(geo: THREE.BufferGeometry): CANNON.ConvexPolyhedron {
  const temp = geo.index ? geo.toNonIndexed() : geo;
  const pos = temp.attributes.position as THREE.BufferAttribute;

  const points: THREE.Vector3[] = [];
  for (let i = 0; i < pos.count; i++) {
    points.push(new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i)));
  }

  const hull = new ConvexHull().setFromPoints(points);

  // Gather unique vertices and map faces
  const vertices: THREE.Vector3[] = [];
  const vMap = new Map<any, number>();
  (hull.faces as any[]).forEach((face: any) => {
    let edge = face.edge;
    do {
      const vert = edge.head(); // ConvexHull VertexNode
      if (!vMap.has(vert)) {
        vMap.set(vert, vertices.length);
        vertices.push(vert.point.clone());
      }
      edge = edge.next;
    } while (edge !== face.edge);
  });

  const faces: number[][] = [];
  (hull.faces as any[]).forEach((face: any) => {
    const indices: number[] = [];
    let edge = face.edge;
    do {
      const idx = vMap.get(edge.head())!;
      indices.push(idx);
      edge = edge.next;
    } while (edge !== face.edge);
    faces.push(indices);
  });

  const cannonVerts = vertices.map((v) => new CANNON.Vec3(v.x, v.y, v.z));
  return new CANNON.ConvexPolyhedron({ vertices: cannonVerts, faces });
}

type FaceDef = { normal: THREE.Vector3; value: number };

function makeReaderFromFaces(faces: FaceDef[]) {
  const ups = new CANNON.Vec3(0, 1, 0);
  return (q: CANNON.Quaternion) => {
    let best = { dot: -Infinity, val: 1 };
    for (const f of faces) {
      const v = new CANNON.Vec3(f.normal.x, f.normal.y, f.normal.z);
      q.vmult(v, v);
      const dot = v.dot(ups);
      if (dot > best.dot) best = { dot, val: f.value };
    }
    return best.val;
  };
}

function extractUniqueFaceNormals(geo: THREE.BufferGeometry): THREE.Vector3[] {
  const temp = geo.clone().toNonIndexed();
  temp.computeVertexNormals();
  const pos = temp.attributes.position as THREE.BufferAttribute;
  const normals: THREE.Vector3[] = [];
  for (let i = 0; i < pos.count; i += 3) {
    const a = new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i));
    const b = new THREE.Vector3(pos.getX(i + 1), pos.getY(i + 1), pos.getZ(i + 1));
    const c = new THREE.Vector3(pos.getX(i + 2), pos.getY(i + 2), pos.getZ(i + 2));
    const n = new THREE.Vector3().crossVectors(b.clone().sub(a), c.clone().sub(a)).normalize();
    if (!normals.some((u) => u.dot(n) > 0.99)) normals.push(n);
  }
  return normals;
}

function buildD6(): DieConfig {
  const faces: FaceDef[] = [
    { normal: new THREE.Vector3(0, 1, 0), value: 1 },
    { normal: new THREE.Vector3(0, -1, 0), value: 6 },
    { normal: new THREE.Vector3(1, 0, 0), value: 3 },
    { normal: new THREE.Vector3(-1, 0, 0), value: 4 },
    { normal: new THREE.Vector3(0, 0, 1), value: 5 },
    { normal: new THREE.Vector3(0, 0, -1), value: 2 },
  ];
  return {
    sides: 6,
    Render: D6Render,
    createShape: () => new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5)),
    readTop: makeReaderFromFaces(faces),
  };
}

function buildD4(): DieConfig {
  const geo = new THREE.TetrahedronGeometry(0.75);
  const normals = extractUniqueFaceNormals(geo);
  const faces: FaceDef[] = normals.map((n, i) => ({ normal: n, value: i + 1 }));
  const Render = ({ color = "#12bfa1" }: { color?: string }) => {
    const mat = useMemo(() => makeMaterial(color), [color]);
    const g = useMemo(() => geo, []);
    return (
      <group>
        <mesh geometry={g} material={mat} castShadow receiveShadow />
        {faces.map((f, i) => (
          <FaceText key={i} text={`${f.value}`} position={f.normal.clone().multiplyScalar(0.5)} normal={f.normal} scale={0.32} />
        ))}
      </group>
    );
  };
  const shape = cannonFromBufferGeometry(geo);
  return { sides: 4, Render, createShape: () => shape, readTop: makeReaderFromFaces(faces) };
}

function buildD8(): DieConfig {
  const geo = new THREE.OctahedronGeometry(0.75);
  const normals = extractUniqueFaceNormals(geo);
  const faces: FaceDef[] = normals.map((n, i) => ({ normal: n, value: i + 1 }));
  const Render = ({ color = "#12bfa1" }: { color?: string }) => {
    const mat = useMemo(() => makeMaterial(color), [color]);
    const g = useMemo(() => geo, []);
    return (
      <group>
        <mesh geometry={g} material={mat} castShadow receiveShadow />
        {faces.map((f, i) => (
          <FaceText key={i} text={`${f.value}`} position={f.normal.clone().multiplyScalar(0.6)} normal={f.normal} scale={0.28} />
        ))}
      </group>
    );
  };
  const shape = cannonFromBufferGeometry(geo);
  return { sides: 8, Render, createShape: () => shape, readTop: makeReaderFromFaces(faces) };
}

// D10 placeholder — swap with true trapezohedron if you want exact 0–9 layout
function buildD10(): DieConfig {
  const geo = new THREE.IcosahedronGeometry(0.75);
  const normals = extractUniqueFaceNormals(geo);
  const pick = normals.slice(0, 10);
  const faces: FaceDef[] = pick.map((n, i) => ({ normal: n, value: (i + 1) % 10 || 10 }));
  const Render = ({ color = "#12bfa1" }: { color?: string }) => {
    const mat = useMemo(() => makeMaterial(color), [color]);
    const g = useMemo(() => geo, []);
    return (
      <group>
        <mesh geometry={g} material={mat} castShadow receiveShadow />
        {faces.map((f, i) => (
          <FaceText key={i} text={`${f.value}`} position={f.normal.clone().multiplyScalar(0.75)} normal={f.normal} scale={0.22} />
        ))}
      </group>
    );
  };
  const shape = cannonFromBufferGeometry(geo);
  return { sides: 10, Render, createShape: () => shape, readTop: makeReaderFromFaces(faces) };
}

function buildD12(): DieConfig {
  const geo = new THREE.DodecahedronGeometry(0.75);
  const normals = extractUniqueFaceNormals(geo);
  const faces: FaceDef[] = normals.map((n, i) => ({ normal: n, value: i + 1 }));
  const Render = ({ color = "#12bfa1" }: { color?: string }) => {
    const mat = useMemo(() => makeMaterial(color), [color]);
    const g = useMemo(() => geo, []);
    return (
      <group>
        <mesh geometry={g} material={mat} castShadow receiveShadow />
        {faces.map((f, i) => (
          <FaceText key={i} text={`${f.value}`} position={f.normal.clone().multiplyScalar(0.7)} normal={f.normal} scale={0.22} />
        ))}
      </group>
    );
  };
  const shape = cannonFromBufferGeometry(geo);
  return { sides: 12, Render, createShape: () => shape, readTop: makeReaderFromFaces(faces) };
}

function buildD20(): DieConfig {
  const geo = new THREE.IcosahedronGeometry(0.75);
  const normals = extractUniqueFaceNormals(geo);
  const faces: FaceDef[] = normals.map((n, i) => ({ normal: n, value: i + 1 }));
  const Render = ({ color = "#12bfa1" }: { color?: string }) => {
    const mat = useMemo(() => makeMaterial(color), [color]);
    const g = useMemo(() => geo, []);
    return (
      <group>
        <mesh geometry={g} material={mat} castShadow receiveShadow />
        {faces.map((f, i) => (
          <FaceText key={i} text={`${f.value}`} position={f.normal.clone().multiplyScalar(0.75)} normal={f.normal} scale={0.2} />
        ))}
      </group>
    );
  };
  const shape = cannonFromBufferGeometry(geo);
  return { sides: 20, Render, createShape: () => shape, readTop: makeReaderFromFaces(faces) };
}

const configs: Record<DieType, DieConfig> = {
  4: buildD4(),
  6: buildD6(),
  8: buildD8(),
  10: buildD10(),
  12: buildD12(),
  20: buildD20(),
};

export function getDieConfig(sides: DieType): DieConfig {
  return configs[sides];
}
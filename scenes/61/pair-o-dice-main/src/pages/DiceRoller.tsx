import { useMemo, useState } from "react";
import { useSettings } from "../store/settings";
import PhysicsScene from "../components/Dice3D/PhysicsScene";
import { clamp, sum } from "../utils/dice";

type DieType = 4 | 6 | 8 | 10 | 12 | 20;

type TrayGroup = {
  sides: DieType;
  qty: number;
  color?: string;
};

type FlatDie = {
  id: string;
  sides: DieType;
  color?: string;
};

type RollResults = {
  flat: number[];
  byType: Record<number, number[]>;
  totals: {
    overall: number;
    perType: Record<number, number>;
  };
};

const SUPPORTED: DieType[] = [4, 6, 8, 10, 12, 20];
const initialTray: TrayGroup[] = [{ sides: 6, qty: 2 }];

export default function DiceRoller() {
  const { use3D, setUse3D } = useSettings();
  const [tray, setTray] = useState<TrayGroup[]>(initialTray);
  const [rollNonce, setRollNonce] = useState(0);
  const [results, setResults] = useState<RollResults | null>(null);

  const diceList: FlatDie[] = useMemo(() => {
    const list: FlatDie[] = [];
    let idx = 0;
    for (const g of tray) {
      const qty = clamp(g.qty, 0, 99);
      for (let i = 0; i < qty; i++) {
        list.push({
          id: `d-${idx++}-${g.sides}-${rollNonce}`,
          sides: normalizeSides(g.sides),
          color: g.color,
        });
      }
    }
    return list;
  }, [tray, rollNonce]);

  function handleAddGroup() {
    setTray((t) => [...t, { sides: 6, qty: 1 }]);
  }
  function handleRemoveGroup(i: number) {
    setTray((t) => t.filter((_, idx) => idx !== i));
  }
  function updateGroup(i: number, patch: Partial<TrayGroup>) {
    setTray((t) => t.map((g, idx) => (idx === i ? { ...g, ...patch } : g)));
  }

  function handleRoll() {
    if (diceList.length === 0) {
      setResults({
        flat: [],
        byType: {},
        totals: { overall: 0, perType: {} },
      });
      return;
    }
    setResults(null);
    if (use3D) {
      setRollNonce((n) => n + 1);
    } else {
      const out: number[] = [];
      const byType: Record<number, number[]> = {};
      for (const d of diceList) {
        const val = 1 + Math.floor(Math.random() * d.sides);
        out.push(val);
        if (!byType[d.sides]) byType[d.sides] = [];
        byType[d.sides].push(val);
      }
      const perType: Record<number, number> = {};
      for (const k of Object.keys(byType)) {
        const key = Number(k);
        perType[key] = sum(byType[key]);
      }
      setResults({
        flat: out,
        byType,
        totals: { overall: sum(out), perType },
      });
    }
  }

  function handleSettled(vals: number[]) {
    const byType: Record<number, number[]> = {};
    diceList.forEach((d, i) => {
      const v = vals[i];
      if (!byType[d.sides]) byType[d.sides] = [];
      byType[d.sides].push(v);
    });
    const perType: Record<number, number> = {};
    for (const k of Object.keys(byType)) {
      const key = Number(k);
      perType[key] = sum(byType[key]);
    }
    setResults({
      flat: vals,
      byType,
      totals: { overall: sum(vals), perType },
    });
  }

  return (
    <div className="card" style={{ marginTop: 16, padding: 24 }}>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <h2 className="header-gradient" style={{ margin: 0, fontSize: 30 }}>
          Dice Roller
        </h2>
        <label className="row" style={{ alignItems: "center", gap: 8 }}>
          <span className="badge">3D Dice</span>
          <input
            type="checkbox"
            checked={use3D}
            onChange={(e) => setUse3D(e.target.checked)}
            style={{ width: 24, height: 24 }}
          />
        </label>
      </div>

      <div className="spacer"></div>

      <div
        className="card"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.06), transparent), rgba(16, 67, 61, 0.5)",
        }}
      >
        <h3 style={{ marginTop: 0 }}>Dice Tray</h3>
        <div className="row" style={{ alignItems: "stretch" }}>
          {tray.map((g, i) => (
            <div
              key={i}
              className="card"
              style={{
                padding: 14,
                display: "flex",
                flexDirection: "column",
                gap: 10,
                minWidth: 240,
              }}
            >
              <div className="row" style={{ justifyContent: "space-between" }}>
                <strong style={{ fontSize: 16 }}>d{g.sides}</strong>
                <button className="button ghost" onClick={() => handleRemoveGroup(i)}>
                  Remove
                </button>
              </div>
              <label>
                <div>Type</div>
                <select
                  className="select"
                  value={g.sides}
                  onChange={(e) =>
                    updateGroup(i, {
                      sides: normalizeSides(parseInt(e.target.value, 10)),
                    })
                  }
                  style={{ width: "100%" }}
                >
                  {SUPPORTED.map((s) => (
                    <option key={s} value={s}>
                      d{s}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <div>Quantity</div>
                <input
                  className="input"
                  type="number"
                  min={0}
                  max={99}
                  value={g.qty}
                  onChange={(e) =>
                    updateGroup(i, {
                      qty: clamp(parseInt(e.target.value || "0", 10), 0, 99),
                    })
                  }
                  style={{ width: "100%" }}
                />
              </label>
            </div>
          ))}

          <div
            className="card"
            style={{
              display: "grid",
              placeItems: "center",
              minWidth: 240,
              color: "#003a2f",
              background:
                "linear-gradient(180deg, rgba(0,224,179,0.2), rgba(0,224,179,0.12))",
              border: "1px dashed rgba(255,255,255,0.25)",
            }}
          >
            <button className="button" onClick={handleAddGroup}>
              + Add Dice
            </button>
          </div>
        </div>

        <div className="spacer"></div>
        <button className="button" onClick={handleRoll}>
          Roll
        </button>
      </div>

      <div className="spacer"></div>

      {use3D ? (
        <>
          <div className="card canvas-frame canvas-vignette" style={{ padding: 0 }}>
            <PhysicsScene
              dice={diceList.map((d) => ({ id: d.id, sides: d.sides }))}
              onSettled={handleSettled}
              showWalls={false}
            />
          </div>
          <div className="spacer"></div>
          <div className="card">
            <h3 style={{ marginTop: 0 }}>Results</h3>
            {results ? <ResultsPanel results={results} /> : <div>Rolling...</div>}
          </div>
        </>
      ) : (
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Results</h3>
          {results ? <ResultsPanel results={results} /> : <div>Click Roll to generate results.</div>}
        </div>
      )}
    </div>
  );
}

function ResultsPanel({
  results,
}: {
  results: {
    flat: number[];
    byType: Record<number, number[]>;
    totals: { overall: number; perType: Record<number, number> };
  };
}) {
  const types = Object.keys(results.byType)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <div>
      {types.length === 0 && <div>No dice in tray.</div>}
      {types.map((sides) => {
        const rolls = results.byType[sides] || [];
        const subtotal = results.totals.perType[sides] ?? 0;
        return (
          <div
            key={sides}
            className="card"
            style={{
              marginBottom: 12,
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.04), transparent), rgba(16, 67, 61, 0.4)",
            }}
          >
            <div className="row" style={{ justifyContent: "space-between" }}>
              <strong>d{sides}</strong>
              <span className="badge">Count: {rolls.length}</span>
            </div>
            <div className="spacer"></div>
            <div className="row" style={{ gap: 8, flexWrap: "wrap" }}>
              {rolls.map((v, i) => (
                <span
                  key={i}
                  className="badge"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    borderColor: "rgba(255,255,255,0.2)",
                  }}
                >
                  {v}
                </span>
              ))}
            </div>
            <div className="spacer"></div>
            <div>Subtotal (d{sides}): {subtotal}</div>
          </div>
        );
      })}
      <hr className="divider" />
      <div style={{ fontWeight: 900, fontSize: 20 }}>
        Overall Total: {results.totals.overall}
      </div>
    </div>
  );
}

function normalizeSides(n: number): DieType {
  const s = [4, 6, 8, 10, 12, 20] as const;
  return (s.includes(n as any) ? n : 6) as DieType;
}
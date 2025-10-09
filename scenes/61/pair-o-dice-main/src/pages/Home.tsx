import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="card" style={{ marginTop: 16, padding: 24 }}>
      <h1 className="header-gradient" style={{ margin: 0, fontSize: 40 }}>
        Welcome to Pair o' Dice
      </h1>
      <p style={{ maxWidth: 760, lineHeight: 1.8, color: "var(--text-dim)" }}>
        Kick back under the palms. Roll some dice, play Yahtzee, and soon, dive
        into a custom dice roguelite. Choose your vibe—glossy 3D dice or snappy
        classic rolls for performance.
      </p>
      <div className="row">
        <Link to="/roller" className="button">
          Roll Dice
        </Link>
        <Link to="/yahtzee" className="button secondary">
          Yahtzee (Soon)
        </Link>
        <Link to="/roguelite" className="button ghost">
          Roguelite (WIP)
        </Link>
      </div>
      <hr className="divider" />
      <p className="badge">Theme: Paradise • Palette: Teal & Sunset</p>
    </div>
  );
};

export default Home;
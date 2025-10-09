import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="container nav-inner">
        <div className="brand">
          <div className="brand-logo" />
          <div>
            <div className="header-gradient" style={{ fontSize: 22 }}>
              Pair o' Dice
            </div>
            <div className="badge">Tropical Dice Hub</div>
          </div>
        </div>
        <nav className="nav-links">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/roller"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            Dice Roller
          </NavLink>
          <NavLink
            to="/yahtzee"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            Yahtzee
          </NavLink>
          <NavLink
            to="/roguelite"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            Roguelite
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
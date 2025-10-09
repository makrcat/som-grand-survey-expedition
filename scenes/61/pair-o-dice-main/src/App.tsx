import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import DiceRoller from "./pages/DiceRoller";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/roller" element={<DiceRoller />} />
        </Routes>
        <footer className="footer">
          Pair o' Dice • A tropical oasis of chance and chill
        </footer>
      </div>
    </>
  );
}

export default App;
import "./App.scss";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./comp/Home";
import List from "./comp/List";
import Write from "./comp/Write";
import Count from "./comp/Count";



function App() {
  return (
    <BrowserRouter basename="/ending_game">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/Count">카운트</Link>
        <Link to="/List">플레이</Link>
        <Link to="/Write">환경설정</Link>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Count" element={<Count />} />
          <Route path="/List" element={<List />} />
          <Route path="/Write" element={<Write />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;

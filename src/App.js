import TodoApp from "../src/components/TodoApp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "../src/components/Homepage";
import "./App.css";
export default function Home() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<TodoApp />} />
          <Route path="/homepage" element={<Homepage />} />
        </Routes>
      </Router>
    </div>
  );
}

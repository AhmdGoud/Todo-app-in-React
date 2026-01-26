import "./App.css";

import TodoList from "./MyComps/TodoListApp";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="*" element={<TodoList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

// Important Note => // React only re-renders when state or props change
// state and props can't updated by mutating

// The Problem:
// affecting is a regular variable, not React state
// Changing it with toggleAffect() doesn't notify React
// React only re-renders when state or props change
// The style object is created once with the initial affecting value (false)

// The syntax forfunckRef.current?.() is using optional chaining with function calls.

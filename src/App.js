import React from "react";
import RegisterPages from "./pages/RegisterPages";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashBoardPage from "./pages/DashBoardPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<RegisterPages />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashBoardPage />} />
          <Route path="/" element={<h1>Home</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

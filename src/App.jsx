import React from "react";

import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

import Game from "./pages/Game/game";

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Game />} />
      </Routes>
    </BrowserRouter>
  )
}
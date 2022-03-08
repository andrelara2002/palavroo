import { BrowserRouter, Route, Routes } from "react-router-dom";

import Game from "./pages/game";
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  )
}
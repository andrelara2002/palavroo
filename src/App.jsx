import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

import Game from "./pages/game";
import './App.css'

export default function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Game />} />
      </Routes>
    </BrowserRouter>
  )
}
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";

import Intinerario from "./intinerario";
import Generador from "./pages/Generador";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intinerario />} />
        <Route path="/generador" element={<Generador />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
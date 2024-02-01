import React from "react";
import Home from "./pages/home";
import Term from "./pages/Term";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/terms" element={<Term />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

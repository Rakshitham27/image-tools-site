import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import BackgroundColorChanger from "./components/BackgroundColorChanger";
import ResizeImage from "./components/ResizeImage";
import ConvertToPDF from "./components/ConvertToPDF";
import AddText from "./components/AddText";
import CropImage from "./components/CropImage";
import CompressImage from "./components/CompressImage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/background-color" element={<BackgroundColorChanger />} />
        <Route path="/resize" element={<ResizeImage />} />
        <Route path="/convert-pdf" element={<ConvertToPDF />} />
        <Route path="/add-text" element={<AddText />} />
        <Route path="/crop" element={<CropImage />} />
        {/* <Route path="/compress" element={<CompressImage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;

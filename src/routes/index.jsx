import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WeatherPage from "../pages";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WeatherPage />} />
      </Routes>
    </Router>
  );
}
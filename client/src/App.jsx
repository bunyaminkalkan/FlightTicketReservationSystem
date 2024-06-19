import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchFlightPage from "./pages/SearchFlightPage";
import FlightListPage from "./pages/FlightListPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchFlightPage />} />
        <Route path="/flights" element={<FlightListPage />} />
      </Routes>
    </Router>
  );
};

export default App;
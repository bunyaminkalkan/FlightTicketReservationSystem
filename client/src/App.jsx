import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchFlightPage from "./pages/SearchFlightPage";
import FlightListPage from "./pages/FlightListPage";
import Navbar from "./components/Navbar"
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const App = () => {
  const id = localStorage.getItem("id");
  const isAdmin = localStorage.getItem("isAdmin");
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<SearchFlightPage />} />
        <Route path="/flights" element={<FlightListPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
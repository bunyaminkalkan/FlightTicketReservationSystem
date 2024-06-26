import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchFlightPage from "./pages/SearchFlightPage";
import FlightListPage from "./pages/FlightListPage";
import Navbar from "./components/Navbar"
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import EditFlightsPage from "./pages/EditFlightsPage";

const App = () => {
  const id = localStorage.getItem("id");
  const isAdmin = localStorage.getItem("isAdmin");
  const email = localStorage.getItem("email");
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<SearchFlightPage />} />
        <Route path="/flights" element={<FlightListPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/editFlights" element={<EditFlightsPage />} />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
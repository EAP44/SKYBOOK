import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import NotFound from "../pages/NotFound.jsx";
import Search_results from "../pages/Search_results.jsx";
import ManageBooking from "../pages/ManageBooking.jsx";
import FlightServices from "../pages/FlightServices.jsx";
import FlightStatus from "../pages/FlightStatus.jsx";
import BookingDetails from "../pages/BookingDetails.jsx";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/booking/search-results" element={<Search_results />} />
      <Route path="/booking/manage" element={<ManageBooking />} />
      <Route path="/flight-services" element={<FlightServices />} />
      <Route path="/flight-status" element={<FlightStatus />} />
      <Route path="/booking/details" element={<BookingDetails />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

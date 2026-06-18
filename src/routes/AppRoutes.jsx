import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import NotFound from "../pages/NotFound.jsx";
import Search_results from "../pages/Search_results.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/booking/search-results" element={<Search_results />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

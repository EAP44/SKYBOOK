import { useState } from "react";

import TopBar from "../components/ui/TopBar";
import Header from "../components/ui/Header";
import Hero from "../components/ui/Hero";
import SearchWidget from "../components/ui/SearchWidget";
import QuickLinks from "../components/ui/QuickLinks";
import FeaturedDestinations from "../components/ui/FeaturedDestinations";
import ExperienceSection from "../components/ui/ExperienceSection";
import AboutUsGrid from "../components/ui/AboutUsGrid";
import Footer from "../components/ui/Footer";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans text-[#231f20]">
      <TopBar />
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero />
      <SearchWidget />
      <QuickLinks />
      <FeaturedDestinations />
      <ExperienceSection />
      <AboutUsGrid />
      <Footer />
    </div>
  );
}
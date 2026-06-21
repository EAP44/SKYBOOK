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
import LoginModal from "../components/ui/auth/LoginModal.jsx";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const [openLogin, setOpenLogin] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  const requireAuth = (action) => {
    if (!isAuthenticated) {
      setPendingAction(() => action);
      setOpenLogin(true);
      return;
    }

    action();
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-[#231f20]">
      <TopBar />
      <Header />

      <div className="flex-1">
        <Hero />
        <SearchWidget setLoading={setLoading} requireAuth={requireAuth} />
        <QuickLinks />
        <FeaturedDestinations />
        <ExperienceSection />
        <AboutUsGrid />
      </div>

      <Footer />

      {loading && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-[#012169] border-t-transparent rounded-full animate-spin" />
            <p className="text-[#012169] font-semibold">Recherche en cours...</p>
          </div>
        </div>
      )}

      <LoginModal
        isOpen={openLogin}
        onClose={() => setOpenLogin(false)}
        onSuccess={() => {
          setOpenLogin(false);

          if (pendingAction) {
            pendingAction();
            setPendingAction(null);
          }
        }}
      />
    </div>
  );
}
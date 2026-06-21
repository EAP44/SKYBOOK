import { useState } from "react";
import { AlertCircle } from "lucide-react";

import TopBar from "../components/ui/TopBar";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";

export default function NotFound() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-[#231f20]">
      <TopBar />
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <main className="flex-1 flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-6 p-44">
        <div className="text-center max-w-lg">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 rounded-full bg-[#012169]/10 flex items-center justify-center">
              <AlertCircle size={50} className="text-[#012169]" />
            </div>
          </div>

          <h1 className="text-7xl font-extrabold text-[#012169] mb-4">404</h1>

          <h2 className="text-3xl font-bold mb-4">
            Oops! Cette page est introuvable
          </h2>

          <p className="text-gray-600 mb-8">
            La page que vous recherchez n'existe pas ou a été déplacée. Vérifiez
            l'URL ou retournez à l'accueil.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

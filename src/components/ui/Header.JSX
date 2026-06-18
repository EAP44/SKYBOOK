import logo from "../../assets/logo.png";
import { Search, Menu, X, User } from "lucide-react";
import { NAV_ITEMS } from "../../data/constData";

export default function Header({ menuOpen, setMenuOpen }) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 md:px-8 h-16">
        <a href="/" className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="skybook logo" className="h-13" />
        </a>

        <nav className="hidden lg:flex items-center gap-7">
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href="#"
              className="text-[13px] font-semibold tracking-wide text-[#231f20] hover:text-[#012169] transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            aria-label="Rechercher"
            className="hidden md:block text-[#231f20] hover:text-[#012169]"
          >
            <Search size={20} />
          </button>
          <a
            href="#"
            className="hidden md:flex items-center gap-1.5 text-[13px] font-semibold text-[#231f20] hover:text-[#012169]"
          >
            <User size={18} />
            Se connecter
          </a>
          <button
            aria-label="Menu"
            className="lg:hidden text-[#231f20]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden border-t border-gray-200 px-4 py-3 flex flex-col gap-3">
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm font-semibold text-[#231f20]"
            >
              {item}
            </a>
          ))}
          <a href="#" className="text-sm font-semibold text-[#012169]">
            Se connecter
          </a>
        </div>
      )}
    </header>
  );
}

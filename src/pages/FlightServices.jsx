import { useMemo, useState } from "react";
import {
  Search,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Plane,
  Calendar,
  Clock,
  X,
  Check,
} from "lucide-react";
import {
  SERVICE_CATEGORIES,
  FLIGHT,
  PROMO_ITEMS,
  fmt,
} from "../data/constData.js";
import TopBar from "../components/ui/TopBar";
import Header from "../components/ui/Header.jsx";
import PageBanner from "../components/ui/PageBanner.jsx";
import Footer from "../components/ui/Footer.jsx";

/* ---------------------------------------------------------------------- */
/* SEARCH FORM                                                             */
/* ---------------------------------------------------------------------- */

function SearchForm({ onFound, error, setError }) {
  const [tab, setTab] = useState("route");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [lastName, setLastName] = useState("");
  const [pnr, setPnr] = useState("");

  const submitRoute = (e) => {
    e.preventDefault();
    if (!origin.trim() || !destination.trim() || !date.trim()) {
      setError(
        "Veuillez renseigner l'aéroport de départ, d'arrivée et la date du vol.",
      );
      return;
    }
    setError(null);
    onFound();
  };

  const submitPnr = (e) => {
    e.preventDefault();
    if (!lastName.trim() || !pnr.trim()) {
      setError(
        "Veuillez renseigner votre nom de famille et votre numéro de réservation.",
      );
      return;
    }
    setError(null);
    onFound();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-sm shadow-sm">
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setTab("route")}
          className={`flex-1 text-center py-3.5 text-[13px] font-semibold tracking-wide transition-colors ${
            tab === "route"
              ? "text-[#012169] border-b-2 border-[#012169]"
              : "text-gray-500 hover:text-[#231f20]"
          }`}
        >
          PAR ITINÉRAIRE
        </button>
        <button
          onClick={() => setTab("pnr")}
          className={`flex-1 text-center py-3.5 text-[13px] font-semibold tracking-wide transition-colors ${
            tab === "pnr"
              ? "text-[#012169] border-b-2 border-[#012169]"
              : "text-gray-500 hover:text-[#231f20]"
          }`}
        >
          PAR NUMÉRO DE RÉSERVATION
        </button>
      </div>

      {tab === "route" ? (
        <form onSubmit={submitRoute} className="p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-semibold text-gray-600 mb-1">
                Aéroport de départ
              </label>
              <input
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="ex. Casablanca (CMN)"
                className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm outline-none focus:border-[#012169]"
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-gray-600 mb-1">
                Aéroport d'arrivée
              </label>
              <input
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="ex. Dubai (DXB)"
                className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm outline-none focus:border-[#012169]"
              />
            </div>
          </div>
          <div>
            <label className="block text-[12px] font-semibold text-gray-600 mb-1">
              Date du vol
            </label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="jj/mm/aaaa"
              className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm outline-none focus:border-[#012169]"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#012169] hover:bg-[#1041b4] transition-colors text-white font-semibold text-sm py-3 rounded tracking-wide flex items-center justify-center gap-2"
          >
            <Search size={16} />
            VOIR LES SERVICES DISPONIBLES
          </button>
        </form>
      ) : (
        <form onSubmit={submitPnr} className="p-6 space-y-4">
          <div>
            <label className="block text-[12px] font-semibold text-gray-600 mb-1">
              Nom de famille
            </label>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="ex. Benali"
              className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm outline-none focus:border-[#012169]"
            />
          </div>
          <div>
            <label className="block text-[12px] font-semibold text-gray-600 mb-1">
              Numéro de réservation (6 caractères)
            </label>
            <input
              value={pnr}
              onChange={(e) => setPnr(e.target.value.toUpperCase())}
              placeholder="ex. X7K9QP"
              className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm outline-none focus:border-[#012169] uppercase"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#012169] hover:bg-[#1041b4] transition-colors text-white font-semibold text-sm py-3 rounded tracking-wide flex items-center justify-center gap-2"
          >
            <Search size={16} />
            VOIR LES SERVICES DISPONIBLES
          </button>
        </form>
      )}

      {error && (
        <div className="mx-6 mb-6 -mt-2 flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 text-[12px] rounded px-3 py-2.5">
          <AlertCircle size={14} className="mt-0.5 shrink-0" />
          {error}
        </div>
      )}
    </div>
  );
}

function HelpPanel() {
  return (
    <div className="bg-white border border-gray-200 rounded-sm p-6">
      <div className="flex items-center gap-2 mb-3">
        <HelpCircle size={17} className="text-[#012169]" />
        <p className="text-sm font-bold text-[#231f20]">Besoin d'aide ?</p>
      </div>
      <ul className="space-y-2.5 text-[13px] text-gray-600">
        <li className="flex items-start gap-2">
          <ChevronRight size={13} className="mt-0.5 text-gray-400 shrink-0" />
          Les repas spéciaux doivent être commandés au moins 24h avant le
          départ.
        </li>
        <li className="flex items-start gap-2">
          <ChevronRight size={13} className="mt-0.5 text-gray-400 shrink-0" />
          Les forfaits Wi-Fi achetés en ligne sont activés automatiquement à
          bord.
        </li>
        <li className="flex items-start gap-2">
          <ChevronRight size={13} className="mt-0.5 text-gray-400 shrink-0" />
          Vos achats Duty Free sont livrés directement à votre siège.
        </li>
      </ul>
      <a
        href="#"
        className="inline-flex items-center gap-1 text-[#012169] text-[13px] font-semibold mt-4 hover:underline"
      >
        Voir toutes les questions fréquentes <ChevronRight size={13} />
      </a>
    </div>
  );
}

function PromoRow() {
  return (
    <div className="grid sm:grid-cols-3 gap-5 mt-10">
      {PROMO_ITEMS.map(({ icon: Icon, title, text }) => (
        <div
          key={title}
          className="bg-white border border-gray-200 rounded-sm p-5"
        >
          <span className="w-11 h-11 rounded-full bg-[#e6ecfa] flex items-center justify-center mb-3">
            <Icon size={20} className="text-[#012169]" />
          </span>
          <p className="text-sm font-bold text-[#231f20] mb-1">{title}</p>
          <p className="text-[12px] text-gray-500">{text}</p>
        </div>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* FLIGHT SUMMARY (post-search)                                            */
/* ---------------------------------------------------------------------- */

function FlightSummaryCard({ onReset }) {
  return (
    <div className="bg-white border border-gray-200 rounded-sm p-5">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div>
          <p className="text-[12px] font-bold tracking-widest text-gray-400 uppercase">
            Vol sélectionné
          </p>
          <p className="text-[13px] text-gray-500 mt-1">
            {FLIGHT.passenger} ·{" "}
            <span className="flex items-center gap-1 inline-flex">
              <Calendar size={12} /> {FLIGHT.date}
            </span>
          </p>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 text-[13px] font-semibold text-gray-500 hover:text-[#012169] border border-gray-300 rounded px-3 py-1.5"
        >
          <X size={13} />
          Nouvelle recherche
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-4 md:gap-8">
        <div className="flex items-center gap-2 text-[12px] font-semibold text-gray-500 w-24">
          <Plane size={14} className="text-[#012169]" />
          {FLIGHT.flightNo}
        </div>
        <div className="flex items-center gap-3 md:gap-6 flex-1 min-w-[220px]">
          <div>
            <p className="text-[16px] font-bold text-[#231f20]">
              {FLIGHT.departTime}
            </p>
            <p className="text-[11px] text-gray-400">{FLIGHT.from}</p>
          </div>
          <div className="flex-1 flex flex-col items-center min-w-[80px]">
            <p className="text-[11px] text-gray-400 flex items-center gap-1">
              <Clock size={11} /> {FLIGHT.duration}
            </p>
            <div className="w-full h-px bg-gray-300 relative my-1.5">
              <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#012169]" />
            </div>
            <p className="text-[11px] text-gray-400">{FLIGHT.aircraft}</p>
          </div>
          <div>
            <p className="text-[16px] font-bold text-[#231f20]">
              {FLIGHT.arriveTime}
            </p>
            <p className="text-[11px] text-gray-400">{FLIGHT.to}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* SERVICE CATEGORY CARD                                                    */
/* ---------------------------------------------------------------------- */

function OptionRow({ option, categoryTitle, isAdded, onToggle }) {
  return (
    <div
      className={`flex items-center justify-between gap-3 border rounded-sm px-3.5 py-3 ${
        isAdded ? "border-[#012169] bg-[#e6ecfa]" : "border-gray-200 bg-white"
      }`}
    >
      <div>
        <p className="text-[13px] font-semibold text-[#231f20]">
          {option.name}
        </p>
        <p className="text-[12px] text-gray-400">
          {option.price === 0 ? "Inclus" : `MAD ${fmt(option.price)}`}
        </p>
      </div>
      <button
        onClick={() => onToggle(option, categoryTitle)}
        className={`text-[12px] font-semibold px-3.5 py-1.5 rounded transition-colors shrink-0 ${
          isAdded
            ? "bg-[#012169] text-white"
            : "border border-[#012169] text-[#012169] hover:bg-[#e6ecfa]"
        }`}
      >
        {isAdded ? (
          <span className="flex items-center gap-1">
            <Check size={12} /> Ajouté
          </span>
        ) : (
          "Ajouter"
        )}
      </button>
    </div>
  );
}

function ServiceCategoryCard({
  category,
  expanded,
  onToggleExpand,
  cart,
  onToggleOption,
}) {
  const addedCount = category.options.filter((o) => cart[o.key]).length;

  return (
    <div className="bg-white border border-gray-200 rounded-sm">
      <button
        onClick={onToggleExpand}
        className="w-full flex items-center gap-4 px-4 md:px-5 py-4 text-left"
      >
        <span className="w-10 h-10 rounded-full bg-[#e6ecfa] flex items-center justify-center shrink-0">
          <category.icon size={18} className="text-[#012169]" />
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-[14px] font-bold text-[#231f20]">
              {category.title}
            </p>
            <span className="text-[10px] font-semibold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
              {category.badge}
            </span>
            {addedCount > 0 && (
              <span className="text-[10px] font-semibold bg-[#012169] text-white px-2 py-0.5 rounded-full">
                {addedCount} ajouté{addedCount > 1 ? "s" : ""}
              </span>
            )}
          </div>
          <p className="text-[12px] text-gray-500 mt-0.5">{category.desc}</p>
        </div>
        {expanded ? (
          <ChevronUp size={18} className="text-gray-400 shrink-0" />
        ) : (
          <ChevronDown size={18} className="text-gray-400 shrink-0" />
        )}
      </button>

      {expanded && (
        <div className="border-t border-gray-200 px-4 md:px-5 py-4 space-y-2.5">
          {category.options.map((option) => (
            <OptionRow
              key={option.key}
              option={option}
              categoryTitle={category.title}
              isAdded={!!cart[option.key]}
              onToggle={onToggleOption}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* STICKY CART SUMMARY                                                     */
/* ---------------------------------------------------------------------- */

function StickyCartBar({ cart, onClearAll }) {
  const items = Object.values(cart);
  if (items.length === 0) return null;
  const total = items.reduce((sum, i) => sum + i.price, 0);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#231f20] text-white z-30 shadow-[0_-4px_12px_rgba(0,0,0,0.2)]">
      <div className="max-w-6xl mx-auto px-4 py-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onClearAll}
            aria-label="Effacer la sélection"
            className="text-gray-400 hover:text-white"
          >
            <X size={16} />
          </button>
          <div>
            <p className="text-[12px] text-gray-300">
              {items.length} service{items.length > 1 ? "s" : ""} ajouté
              {items.length > 1 ? "s" : ""}
            </p>
            <p className="text-[18px] font-extrabold">MAD {fmt(total)}</p>
          </div>
        </div>
        <button className="bg-[#012169] hover:bg-[#1041b4] transition-colors text-white font-semibold text-sm px-7 py-2.5 rounded tracking-wide">
          CONTINUER ET PAYER
        </button>
      </div>
    </div>
  );
}



/* ---------------------------------------------------------------------- */
/* PAGE                                                                     */
/* ---------------------------------------------------------------------- */

export default function FlightServices() {
  const [found, setFound] = useState(false);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState("meals");
  const [cart, setCart] = useState({});

  const toggleOption = (option, categoryTitle) => {
    setCart((prev) => {
      const next = { ...prev };
      if (next[option.key]) {
        delete next[option.key];
      } else {
        next[option.key] = { ...option, categoryTitle };
      }
      return next;
    });
  };

  const resetSearch = () => {
    setFound(false);
    setCart({});
  };

  const cartCount = useMemo(() => Object.keys(cart).length, [cart]);

  return (
    <div className="min-h-screen bg-[#f7f6f4] font-sans text-[#231f20] pb-20">
      <TopBar/>
      <Header />
      <PageBanner
        title="Services disponibles sur votre vol"
        description="Repas spéciaux, bagages, Wi-Fi, boutique Duty Free et plus encore — personnalisez votre vol avant le départ."
      />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {!found ? (
          <>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <SearchForm
                  onFound={() => setFound(true)}
                  error={error}
                  setError={setError}
                />
              </div>
              <div>
                <HelpPanel />
              </div>
            </div>
            <PromoRow />
          </>
        ) : (
          <div className="space-y-5">
            <FlightSummaryCard onReset={resetSearch} />

            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-[#231f20]">
                Personnalisez votre vol
              </p>
              {cartCount > 0 && (
                <p className="text-[12px] text-gray-500">
                  {cartCount} service{cartCount > 1 ? "s" : ""} sélectionné
                  {cartCount > 1 ? "s" : ""}
                </p>
              )}
            </div>

            <div className="space-y-3">
              {SERVICE_CATEGORIES.map((category) => (
                <ServiceCategoryCard
                  key={category.id}
                  category={category}
                  expanded={expandedId === category.id}
                  onToggleExpand={() =>
                    setExpandedId(
                      expandedId === category.id ? null : category.id,
                    )
                  }
                  cart={cart}
                  onToggleOption={toggleOption}
                />
              ))}
            </div>

            <p className="text-[11px] text-gray-400 mt-2">
              Les services sélectionnés seront ajoutés au prix total de votre
              réservation et facturés au moment du paiement.
            </p>
          </div>
        )}
      </div>

      <StickyCartBar cart={cart} onClearAll={() => setCart({})} />
      <Footer/>
    </div>
  );
}

import { useMemo, useState } from "react";
import { ChevronRight, ChevronDown, ArrowRight, Pencil } from "lucide-react";
import { TRIP, FLIGHTS, SORT_OPTIONS } from "../data/constData";
import FlightCard from "../components/ui/FlightCard";
import DateCarousel from "../components/ui/DateCarousel";
import FiltersSidebar from "../components/ui/FiltersSidebar";
import StickySummary from "../components/ui/StickySummary";
import Footer from "../components/ui/Footer";
import TopBar from "../components/ui/TopBar";
import Header from "../components/ui/Header";

/* ------------------------HEADER / TRIP SUMMARY--------------------------- */

function MiniHeader() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <img
          src="https://c.ekstatic.net/ecl/logos/emirates/emirates-logo-badge.svg"
          alt="Emirates logo"
          className="h-8"
        />
        <div className="hidden sm:flex items-center gap-2 text-[12px] font-semibold text-gray-400">
          <span className="text-[#012169]">1. Vols</span>
          <ChevronRight size={13} />
          <span>2. Passagers</span>
          <ChevronRight size={13} />
          <span>3. Extras</span>
          <ChevronRight size={13} />
          <span>4. Paiement</span>
        </div>
      </div>
    </header>
  );
}

function TripSummaryBar() {
  return (
    <div className="bg-[#231f20] text-white">
      <div className="max-w-6xl mx-auto px-4 py-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="font-bold">
            {TRIP.from} ({TRIP.fromCode})
          </span>
          <ArrowRight size={14} className="text-gray-400" />
          <span className="font-bold">
            {TRIP.to} ({TRIP.toCode})
          </span>
          <span className="text-gray-400 mx-1">|</span>
          <span className="text-gray-300">
            {TRIP.departLabel} – {TRIP.returnLabel}
          </span>
          <span className="text-gray-400 mx-1">|</span>
          <span className="text-gray-300">
            {TRIP.pax} · {TRIP.cabin}
          </span>
        </div>
        <button className="flex items-center gap-1.5 text-[13px] font-semibold border border-white/30 rounded px-3 py-1.5 hover:bg-white/10 transition-colors">
          <Pencil size={13} />
          <a href="/" className="hover:underline">
            Modifier la recherche
          </a>
        </button>
      </div>
    </div>
  );
}

/* ------------------------RESULTS LIST + SORT BAR--------------------------- */

function SortBar({ sortBy, setSortBy, count }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
      <p className="text-[13px] text-gray-500">
        <span className="font-bold text-[#231f20]">{count}</span> vols trouvés
        pour {TRIP.fromCode} → {TRIP.toCode}
      </p>
      <div className="flex items-center gap-2">
        <span className="text-[12px] text-gray-500">Trier par :</span>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-[13px] border border-gray-300 rounded px-3 py-1.5 pr-7 appearance-none bg-white font-semibold"
          >
            {SORT_OPTIONS.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={13}
            className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
          />
        </div>
      </div>
    </div>
  );
}

function parseDurationToMinutes(d) {
  const [h, m] = d
    .replace("h", ":")
    .split(":")
    .map((s) => parseInt(s));
  return h * 60 + (m || 0);
}

/* ---------------------------------PAGE------------------------------------- */

export default function Search_results() {
  const [selectedDateIdx, setSelectedDateIdx] = useState(2);
  const [expandedId, setExpandedId] = useState(1);
  const [selectedFare, setSelectedFare] = useState(null);
  const [sortBy, setSortBy] = useState("price");
  const [stopFilter, setStopFilter] = useState({
    direct: true,
    oneStop: false,
  });
  const [timeFilter, setTimeFilter] = useState([]);
  const [priceMax, setPriceMax] = useState(15000);

  const toggleTimeFilter = (key) =>
    setTimeFilter((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );

  const visibleFlights = useMemo(() => {
    let list = FLIGHTS.filter(
      (f) => Math.min(...f.fares.map((x) => x.price)) <= priceMax,
    );

    if (timeFilter.length > 0) {
      list = list.filter((f) => {
        const hour = parseInt(f.departTime.split(":")[0]);
        return timeFilter.some((slot) => {
          if (slot === "early") return hour >= 0 && hour < 6;
          if (slot === "morning") return hour >= 6 && hour < 12;
          if (slot === "afternoon") return hour >= 12 && hour < 18;
          if (slot === "evening") return hour >= 18 && hour < 24;
          return false;
        });
      });
    }

    const sorted = [...list];
    if (sortBy === "price") {
      sorted.sort(
        (a, b) =>
          Math.min(...a.fares.map((x) => x.price)) -
          Math.min(...b.fares.map((x) => x.price)),
      );
    } else if (sortBy === "duration") {
      sorted.sort(
        (a, b) =>
          parseDurationToMinutes(a.duration) -
          parseDurationToMinutes(b.duration),
      );
    } else if (sortBy === "departure") {
      sorted.sort((a, b) => a.departTime.localeCompare(b.departTime));
    }
    return sorted;
  }, [sortBy, timeFilter, priceMax]);

  return (
    <div className="min-h-screen bg-[#f7f6f4] font-sans text-[#231f20] ">
      <TopBar />
      <Header />
      <TripSummaryBar />
      <MiniHeader />
      <DateCarousel
        selectedIdx={selectedDateIdx}
        setSelectedIdx={setSelectedDateIdx}
      />

      <div className="max-w-6xl mx-auto px-4 py-6 flex gap-6">
        <FiltersSidebar
          stopFilter={stopFilter}
          setStopFilter={setStopFilter}
          timeFilter={timeFilter}
          toggleTimeFilter={toggleTimeFilter}
          priceMax={priceMax}
          setPriceMax={setPriceMax}
        />

        <main className="flex-1 min-w-0">
          <SortBar
            sortBy={sortBy}
            setSortBy={setSortBy}
            count={visibleFlights.length}
          />

          <p className="text-[13px] font-bold text-gray-500 mb-3 uppercase tracking-wide">
            Vol aller · {TRIP.departLabel}
          </p>

          {visibleFlights.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-sm p-8 text-center text-gray-500 text-sm">
              Aucun vol ne correspond à vos filtres. Essayez d'élargir vos
              critères.
            </div>
          )}

          {visibleFlights.map((flight) => (
            <FlightCard
              key={flight.id}
              flight={flight}
              expanded={expandedId === flight.id}
              onToggle={() =>
                setExpandedId(expandedId === flight.id ? null : flight.id)
              }
              selected={selectedFare}
              onSelectFare={setSelectedFare}
            />
          ))}

          <p className="text-[11px] text-gray-400 mt-4">
            Les tarifs affichés sont par passager, taxes et frais inclus, et
            soumis à disponibilité au moment de la réservation.
          </p>
        </main>
      </div>

      <StickySummary
        selected={selectedFare}
        onClear={() => setSelectedFare(null)}
      />
      <Footer />
    </div>
  );
}

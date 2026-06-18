import { useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Clock,
  Briefcase,
  Check,
  SlidersHorizontal,
  Plane,
  Pencil,
  X,
} from "lucide-react";

/* ---------------------------------------------------------------------- */
/* DATA                                                                    */
/* ---------------------------------------------------------------------- */

const TRIP = {
  from: "Casablanca",
  fromCode: "CMN",
  to: "Dubai",
  toCode: "DXB",
  departLabel: "Mer. 24 juin 2026",
  returnLabel: "Mer. 1 juil. 2026",
  pax: "1 Adulte",
  cabin: "Classe Économique",
};

const DATES = [
  { day: "Lun", date: "22 juin", price: 9620 },
  { day: "Mar", date: "23 juin", price: 9410 },
  { day: "Mer", date: "24 juin", price: 9771, selected: true },
  { day: "Jeu", date: "25 juin", price: 10120 },
  { day: "Ven", date: "26 juin", price: 11340 },
  { day: "Sam", date: "27 juin", price: 10890 },
  { day: "Dim", date: "28 juin", price: 9990 },
];

const FARE_TEMPLATE = [
  {
    key: "special",
    name: "Special",
    baggage: "1 bagage en cabine · pas de bagage en soute",
    flex: "Non modifiable",
    seat: "Sélection de siège payante",
  },
  {
    key: "saver",
    name: "Saver",
    baggage: "1 bagage en cabine · 1 bagage en soute (30 kg)",
    flex: "Modification possible (frais applicables)",
    seat: "Sélection de siège payante",
  },
  {
    key: "flex",
    name: "Flex",
    baggage: "1 bagage en cabine · 1 bagage en soute (30 kg)",
    flex: "Changement de date gratuit",
    seat: "Sélection de siège gratuite",
  },
  {
    key: "flexplus",
    name: "Flex Plus",
    baggage: "1 bagage en cabine · 2 bagages en soute (30 kg)",
    flex: "Remboursable · changement gratuit",
    seat: "Sélection de siège gratuite + accès salon",
  },
];

function buildFlight(id, departTime, arriveTime, duration, flightNo, base) {
  return {
    id,
    flightNo,
    departTime,
    arriveTime,
    duration,
    stops: "Sans escale",
    aircraft: "Boeing 777-300ER",
    fares: FARE_TEMPLATE.map((f, i) => ({
      ...f,
      price: base + i * 1850 + (id % 2 === 0 ? 120 : 0),
    })),
  };
}

const FLIGHTS = [
  buildFlight(1, "03:35", "13:25", "7 h 50", "EK 751", 9771),
  buildFlight(2, "09:50", "19:45", "7 h 55", "EK 753", 10240),
  buildFlight(3, "14:20", "00:05 (+1)", "7 h 45", "EK 755", 10890),
  buildFlight(4, "22:10", "07:55 (+1)", "7 h 45", "EK 757", 9990),
];

const TIME_SLOTS = [
  { key: "early", label: "00h – 06h" },
  { key: "morning", label: "06h – 12h" },
  { key: "afternoon", label: "12h – 18h" },
  { key: "evening", label: "18h – 24h" },
];

const SORT_OPTIONS = [
  { key: "price", label: "Prix le plus bas" },
  { key: "duration", label: "Durée la plus courte" },
  { key: "departure", label: "Départ le plus tôt" },
];

const fmt = (n) => n.toLocaleString("fr-FR");

/* ---------------------------------------------------------------------- */
/* HEADER / TRIP SUMMARY                                                   */
/* ---------------------------------------------------------------------- */

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
          Modifier la recherche
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* DATE CAROUSEL                                                            */
/* ---------------------------------------------------------------------- */

function DateCarousel({ selectedIdx, setSelectedIdx }) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-2 flex items-center gap-1 py-2">
        <button className="hidden sm:flex p-2 text-gray-400 hover:text-[#012169]">
          <ChevronLeft size={18} />
        </button>
        <div className="flex-1 grid grid-cols-7 gap-1.5">
          {DATES.map((d, i) => (
            <button
              key={d.date}
              onClick={() => setSelectedIdx(i)}
              className={`flex flex-col items-center rounded-sm py-2 px-1 transition-colors ${
                selectedIdx === i
                  ? "bg-[#012169] text-white"
                  : "bg-gray-50 text-[#231f20] hover:bg-gray-100"
              }`}
            >
              <span className="text-[11px] uppercase opacity-80">{d.day}</span>
              <span className="text-[12px] font-semibold">{d.date}</span>
              <span className="text-[12px] font-bold mt-0.5">{fmt(d.price)}</span>
            </button>
          ))}
        </div>
        <button className="hidden sm:flex p-2 text-gray-400 hover:text-[#012169]">
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* FILTERS SIDEBAR                                                          */
/* ---------------------------------------------------------------------- */

function FilterSection({ title, children }) {
  return (
    <div className="border-b border-gray-200 py-4">
      <p className="text-[13px] font-bold text-[#231f20] mb-3">{title}</p>
      {children}
    </div>
  );
}

function FiltersSidebar({ stopFilter, setStopFilter, timeFilter, toggleTimeFilter, priceMax, setPriceMax }) {
  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="sticky top-4 bg-white border border-gray-200 rounded-sm px-4">
        <div className="flex items-center gap-2 py-4 border-b border-gray-200">
          <SlidersHorizontal size={15} className="text-[#012169]" />
          <p className="text-[13px] font-bold text-[#231f20]">Filtrer les résultats</p>
        </div>

        <FilterSection title="Escales">
          <div className="space-y-2.5 text-[13px]">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={stopFilter.direct}
                onChange={() => setStopFilter((s) => ({ ...s, direct: !s.direct }))}
                className="accent-[#012169]"
              />
              Sans escale
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-gray-400">
              <input
                type="checkbox"
                checked={stopFilter.oneStop}
                onChange={() => setStopFilter((s) => ({ ...s, oneStop: !s.oneStop }))}
                className="accent-[#012169]"
              />
              1 escale
              <span className="text-[11px]">(indisponible)</span>
            </label>
          </div>
        </FilterSection>

        <FilterSection title="Heure de départ">
          <div className="grid grid-cols-2 gap-2">
            {TIME_SLOTS.map((t) => (
              <button
                key={t.key}
                onClick={() => toggleTimeFilter(t.key)}
                className={`text-[12px] font-semibold rounded px-2 py-2 border transition-colors ${
                  timeFilter.includes(t.key)
                    ? "border-[#012169] bg-[#fdeceb] text-[#012169]"
                    : "border-gray-300 text-gray-600 hover:border-gray-400"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Prix maximum">
          <input
            type="range"
            min="9000"
            max="15000"
            step="250"
            value={priceMax}
            onChange={(e) => setPriceMax(Number(e.target.value))}
            className="w-full accent-[#012169]"
          />
          <p className="text-[12px] text-gray-500 mt-1">Jusqu'à MAD {fmt(priceMax)}</p>
        </FilterSection>

        <div className="py-4">
          <p className="text-[13px] font-bold text-[#231f20] mb-2">Compagnie</p>
          <label className="flex items-center gap-2 text-[13px] text-gray-500">
            <input type="checkbox" checked disabled className="accent-[#012169]" />
            Emirates (uniquement)
          </label>
        </div>
      </div>
    </aside>
  );
}

/* ---------------------------------------------------------------------- */
/* FLIGHT CARD                                                              */
/* ---------------------------------------------------------------------- */

function FareColumn({ fare, flightId, selected, onSelect }) {
  const isSelected = selected && selected.flightId === flightId && selected.fareKey === fare.key;
  return (
    <div
      className={`flex flex-col border rounded-sm p-3.5 ${
        isSelected ? "border-[#012169] bg-[#ebf1fd]" : "border-gray-200 bg-white"
      }`}
    >
      <p className="text-[13px] font-bold text-[#231f20]">{fare.name}</p>
      <p className="text-[20px] font-extrabold text-[#1f1f23] mt-1.5">MAD {fmt(fare.price)}</p>
      <p className="text-[11px] text-gray-400 mb-2.5">par passager</p>

      <div className="flex items-start gap-1.5 text-[11px] text-gray-600 mb-1.5">
        <Briefcase size={13} className="mt-0.5 shrink-0" />
        <span>{fare.baggage}</span>
      </div>
      <div className="flex items-start gap-1.5 text-[11px] text-gray-600 mb-1.5">
        <Check size={13} className="mt-0.5 shrink-0" />
        <span>{fare.flex}</span>
      </div>
      <div className="flex items-start gap-1.5 text-[11px] text-gray-600 mb-3.5">
        <Check size={13} className="mt-0.5 shrink-0" />
        <span>{fare.seat}</span>
      </div>

      <button
        onClick={() => onSelect({ flightId, fareKey: fare.key, price: fare.price, fareName: fare.name })}
        className={`mt-auto text-[12px] font-semibold py-2 rounded transition-colors ${
          isSelected
            ? "bg-[#012169] text-white"
            : "border border-[#012169] text-[#012169] hover:bg-[#ebebfd]"
        }`}
      >
        {isSelected ? "Sélectionné" : "Sélectionner"}
      </button>
    </div>
  );
}

function FlightCard({ flight, expanded, onToggle, selected, onSelectFare }) {
  const lowest = Math.min(...flight.fares.map((f) => f.price));

  return (
    <div className="bg-white border border-gray-200 rounded-sm mb-4">
      <button
        onClick={onToggle}
        className="w-full flex flex-wrap items-center gap-4 md:gap-8 px-4 md:px-6 py-4 text-left"
      >
        <div className="flex items-center gap-2 text-[12px] font-semibold text-gray-500 w-24">
          <Plane size={14} className="text-[#012169]" />
          {flight.flightNo}
        </div>

        <div className="flex items-center gap-3 md:gap-6 flex-1 min-w-[220px]">
          <div className="text-center">
            <p className="text-[16px] font-bold text-[#231f20]">{flight.departTime}</p>
            <p className="text-[11px] text-gray-400">{TRIP.fromCode}</p>
          </div>
          <div className="flex-1 flex flex-col items-center min-w-[80px]">
            <p className="text-[11px] text-gray-400 flex items-center gap-1">
              <Clock size={11} /> {flight.duration}
            </p>
            <div className="w-full h-px bg-gray-300 relative my-1.5">
              <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#012169]" />
            </div>
            <p className="text-[11px] text-green-700 font-semibold">{flight.stops}</p>
          </div>
          <div className="text-center">
            <p className="text-[16px] font-bold text-[#231f20]">{flight.arriveTime}</p>
            <p className="text-[11px] text-gray-400">{TRIP.toCode}</p>
          </div>
        </div>

        <div className="hidden md:block text-[12px] text-gray-400 w-36">{flight.aircraft}</div>

        <div className="flex items-center gap-3 ml-auto">
          <div className="text-right">
            <p className="text-[10px] text-gray-400">à partir de</p>
            <p className="text-[17px] font-extrabold text-[#012169]">MAD {fmt(lowest)}</p>
          </div>
          {expanded ? (
            <ChevronUp size={18} className="text-gray-400" />
          ) : (
            <ChevronDown size={18} className="text-gray-400" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-gray-200 px-4 md:px-6 py-5">
          <p className="text-[12px] font-semibold text-gray-500 mb-3">Choisissez votre tarif</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {flight.fares.map((f) => (
              <FareColumn key={f.key} fare={f} flightId={flight.id} selected={selected} onSelect={onSelectFare} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* RESULTS LIST + SORT BAR                                                  */
/* ---------------------------------------------------------------------- */

function SortBar({ sortBy, setSortBy, count }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
      <p className="text-[13px] text-gray-500">
        <span className="font-bold text-[#231f20]">{count}</span> vols trouvés pour {TRIP.fromCode} → {TRIP.toCode}
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
          <ChevronDown size={13} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
        </div>
      </div>
    </div>
  );
}

function parseDurationToMinutes(d) {
  const [h, m] = d.replace("h", ":").split(":").map((s) => parseInt(s));
  return h * 60 + (m || 0);
}

/* ---------------------------------------------------------------------- */
/* STICKY SUMMARY BAR                                                      */
/* ---------------------------------------------------------------------- */

function StickySummary({ selected, onClear }) {
  if (!selected) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#231f20] text-white z-30 shadow-[0_-4px_12px_rgba(0,0,0,0.2)]">
      <div className="max-w-6xl mx-auto px-4 py-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button onClick={onClear} aria-label="Effacer la sélection" className="text-gray-400 hover:text-white">
            <X size={16} />
          </button>
          <div>
            <p className="text-[12px] text-gray-300">
              Vol aller sélectionné · Tarif {selected.fareName}
            </p>
            <p className="text-[18px] font-extrabold">MAD {fmt(selected.price)}</p>
          </div>
        </div>
        <button className="bg-[#012169] hover:bg-[#1041b4] transition-colors text-white font-semibold text-sm px-7 py-2.5 rounded tracking-wide">
          CONTINUER VERS LE VOL RETOUR
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* PAGE                                                                     */
/* ---------------------------------------------------------------------- */

export default function Search_results() {
  const [selectedDateIdx, setSelectedDateIdx] = useState(2);
  const [expandedId, setExpandedId] = useState(1);
  const [selectedFare, setSelectedFare] = useState(null);
  const [sortBy, setSortBy] = useState("price");
  const [stopFilter, setStopFilter] = useState({ direct: true, oneStop: false });
  const [timeFilter, setTimeFilter] = useState([]);
  const [priceMax, setPriceMax] = useState(15000);

  const toggleTimeFilter = (key) =>
    setTimeFilter((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));

  const visibleFlights = useMemo(() => {
    let list = FLIGHTS.filter((f) => Math.min(...f.fares.map((x) => x.price)) <= priceMax);

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
      sorted.sort((a, b) => Math.min(...a.fares.map((x) => x.price)) - Math.min(...b.fares.map((x) => x.price)));
    } else if (sortBy === "duration") {
      sorted.sort((a, b) => parseDurationToMinutes(a.duration) - parseDurationToMinutes(b.duration));
    } else if (sortBy === "departure") {
      sorted.sort((a, b) => a.departTime.localeCompare(b.departTime));
    }
    return sorted;
  }, [sortBy, timeFilter, priceMax]);

  return (
    <div className="min-h-screen bg-[#f7f6f4] font-sans text-[#231f20] pb-20">
      <MiniHeader />
      <TripSummaryBar />
      <DateCarousel selectedIdx={selectedDateIdx} setSelectedIdx={setSelectedDateIdx} />

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
          <SortBar sortBy={sortBy} setSortBy={setSortBy} count={visibleFlights.length} />

          <p className="text-[13px] font-bold text-gray-500 mb-3 uppercase tracking-wide">
            Vol aller · {TRIP.departLabel}
          </p>

          {visibleFlights.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-sm p-8 text-center text-gray-500 text-sm">
              Aucun vol ne correspond à vos filtres. Essayez d'élargir vos critères.
            </div>
          )}

          {visibleFlights.map((flight) => (
            <FlightCard
              key={flight.id}
              flight={flight}
              expanded={expandedId === flight.id}
              onToggle={() => setExpandedId(expandedId === flight.id ? null : flight.id)}
              selected={selectedFare}
              onSelectFare={setSelectedFare}
            />
          ))}

          <p className="text-[11px] text-gray-400 mt-4">
            Les tarifs affichés sont par passager, taxes et frais inclus, et soumis à disponibilité au moment de la réservation.
          </p>
        </main>
      </div>

      <StickySummary selected={selectedFare} onClear={() => setSelectedFare(null)} />
    </div>
  );
}
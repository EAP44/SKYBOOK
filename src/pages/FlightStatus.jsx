import { useState } from "react";
import {
  Search,
  Plane,
  RefreshCw,
  Bell,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  Luggage,
  X,
} from "lucide-react";
import Header from "../components/ui/Header.jsx";
import Footer from "../components/ui/Footer.jsx";
import PageBanner from "../components/ui/PageBanner.jsx";
import TopBar from "../components/ui/TopBar.jsx";

/* ---------------------------------------------------------------------- */
/* DATA                                                                    */
/* ---------------------------------------------------------------------- */

const PROMO_ITEMS = [
  {
    icon: Clock,
    title: "Suivi en temps réel",
    text: "Consultez les horaires prévus, estimés et réels de votre vol.",
  },
  {
    icon: Bell,
    title: "Alertes personnalisées",
    text: "Recevez un e-mail ou un SMS en cas de changement de votre vol.",
  },
  {
    icon: MapPin,
    title: "Portes & tapis bagages",
    text: "Trouvez votre porte d'embarquement et votre tapis à bagages.",
  },
];

const STATUS_STEPS = [
  { key: "checkin", label: "Enregistrement" },
  { key: "boarding", label: "Embarquement" },
  { key: "departed", label: "Décollage" },
  { key: "enroute", label: "En vol" },
  { key: "arrived", label: "Atterrissage" },
];

const FLIGHT_STATUS = {
  flightNo: "SB 751",
  date: "Mer. 24 juin 2026",
  aircraft: "Boeing 777-300ER",
  duration: "7 h 50",
  distance: "5 847 km",
  currentStepIndex: 3,
  progress: 62,
  departure: {
    airport: "Casablanca (CMN)",
    city: "Casablanca",
    terminal: "Terminal 1",
    gate: "B12",
    scheduled: "03:35",
    estimated: "03:35",
    status: "Décollé",
    onTime: true,
  },
  arrival: {
    airport: "Dubai (DXB)",
    city: "Dubai",
    terminal: "Terminal 3",
    gate: "—",
    baggage: "Carrousel 4",
    scheduled: "13:25",
    estimated: "13:40",
    status: "Prévu",
    onTime: false,
  },
};

const fmt = (n) => n.toLocaleString("fr-FR");

/* ---------------------------------------------------------------------- */
/* SEARCH FORM                                                             */
/* ---------------------------------------------------------------------- */

function SearchForm({ onFound, error, setError }) {
  const [tab, setTab] = useState("route");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [flightNo, setFlightNo] = useState("");
  const [flightDate, setFlightDate] = useState("");

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

  const submitFlightNo = (e) => {
    e.preventDefault();
    if (!flightNo.trim() || !flightDate.trim()) {
      setError("Veuillez renseigner le numéro de vol et la date.");
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
          onClick={() => setTab("flightno")}
          className={`flex-1 text-center py-3.5 text-[13px] font-semibold tracking-wide transition-colors ${
            tab === "flightno"
              ? "text-[#012169] border-b-2 border-[#012169]"
              : "text-gray-500 hover:text-[#231f20]"
          }`}
        >
          PAR NUMÉRO DE VOL
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
            VÉRIFIER LE STATUT
          </button>
        </form>
      ) : (
        <form onSubmit={submitFlightNo} className="p-6 space-y-4">
          <div>
            <label className="block text-[12px] font-semibold text-gray-600 mb-1">
              Numéro de vol
            </label>
            <input
              value={flightNo}
              onChange={(e) => setFlightNo(e.target.value.toUpperCase())}
              placeholder="ex. SB 751"
              className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm outline-none focus:border-[#012169] uppercase"
            />
          </div>
          <div>
            <label className="block text-[12px] font-semibold text-gray-600 mb-1">
              Date du vol
            </label>
            <input
              type="text"
              value={flightDate}
              onChange={(e) => setFlightDate(e.target.value)}
              placeholder="jj/mm/aaaa"
              className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm outline-none focus:border-[#012169]"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#012169] hover:bg-[#1041b4] transition-colors text-white font-semibold text-sm py-3 rounded tracking-wide flex items-center justify-center gap-2"
          >
            <Search size={16} />
            VÉRIFIER LE STATUT
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
          Les statuts sont mis à jour automatiquement toutes les minutes.
        </li>
        <li className="flex items-start gap-2">
          <ChevronRight size={13} className="mt-0.5 text-gray-400 shrink-0" />
          Les portes d'embarquement ne sont confirmées que 2h avant le départ.
        </li>
        <li className="flex items-start gap-2">
          <ChevronRight size={13} className="mt-0.5 text-gray-400 shrink-0" />
          Vous ne trouvez pas votre vol ? Vérifiez le numéro et la date saisis.
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
/* RESULT — STATUS HEADER                                                  */
/* ---------------------------------------------------------------------- */

function StatusHeaderCard({ onReset, onRefresh, lastUpdated }) {
  return (
    <div className="bg-white border border-gray-200 rounded-sm p-5 flex flex-wrap items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-gray-500">
            <Plane size={14} className="text-[#012169]" />
            {FLIGHT_STATUS.flightNo}
          </span>
          <span className="flex items-center gap-1 bg-[#e6ecfa] text-[#012169] text-[11px] font-semibold px-2 py-0.5 rounded-full">
            {STATUS_STEPS[FLIGHT_STATUS.currentStepIndex].label}
          </span>
          <span className="flex items-center gap-1 text-[12px] text-gray-500">
            <Calendar size={12} /> {FLIGHT_STATUS.date}
          </span>
        </div>
        <p className="text-[13px] text-gray-500 mt-1">
          {FLIGHT_STATUS.departure.city} → {FLIGHT_STATUS.arrival.city} ·{" "}
          {FLIGHT_STATUS.aircraft}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onRefresh}
          className="flex items-center gap-1.5 text-[13px] font-semibold text-gray-500 hover:text-[#012169] border border-gray-300 rounded px-3 py-1.5"
        >
          <RefreshCw size={13} />
          Actualisé {lastUpdated}
        </button>
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 text-[13px] font-semibold text-gray-500 hover:text-[#012169] border border-gray-300 rounded px-3 py-1.5"
        >
          <X size={13} />
          Nouvelle recherche
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* RESULT — FLIGHT PROGRESS TRACK                                          */
/* ---------------------------------------------------------------------- */

function FlightProgressTrack() {
  const { departure, arrival, progress, duration, distance } = FLIGHT_STATUS;
  return (
    <div className="bg-white border border-gray-200 rounded-sm p-5">
      <div className="flex flex-wrap items-center gap-4 md:gap-8">
        <div>
          <p className="text-[16px] font-bold text-[#231f20]">
            {departure.scheduled}
          </p>
          <p className="text-[11px] text-gray-400">{departure.airport}</p>
        </div>

        <div className="flex-1 min-w-[160px]">
          <p className="text-[11px] text-gray-400 text-center mb-1.5 flex items-center justify-center gap-1">
            <Clock size={11} /> {duration} · {distance}
          </p>
          <div className="relative h-1.5 bg-gray-200 rounded-full">
            <div
              className="absolute inset-y-0 left-0 bg-[#012169] rounded-full"
              style={{ width: `${progress}%` }}
            />
            <span
              className="absolute -top-2 w-5 h-5 rounded-full bg-white border-2 border-[#012169] flex items-center justify-center -translate-x-1/2"
              style={{ left: `${progress}%` }}
            >
              <Plane size={11} className="text-[#012169] rotate-90" />
            </span>
          </div>
          <p className="text-[11px] text-[#012169] font-semibold text-center mt-2">
            {progress}% du trajet effectué
          </p>
        </div>

        <div className="text-right">
          <p className="text-[16px] font-bold text-[#231f20]">
            {arrival.estimated}
          </p>
          <p className="text-[11px] text-gray-400">{arrival.airport}</p>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* RESULT — DEPARTURE / ARRIVAL DETAILS                                    */
/* ---------------------------------------------------------------------- */

function LegCard({ label, leg, showBaggage }) {
  const delayed = leg.scheduled !== leg.estimated;
  return (
    <div className="bg-white border border-gray-200 rounded-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[12px] font-bold tracking-widest text-gray-400 uppercase">
          {label}
        </p>
        <span
          className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
            delayed
              ? "bg-amber-50 text-amber-700"
              : "bg-green-50 text-green-700"
          }`}
        >
          <CheckCircle2 size={12} />
          {leg.status}
        </span>
      </div>

      <p className="text-sm font-bold text-[#231f20]">{leg.airport}</p>
      <p className="text-[12px] text-gray-500 mt-0.5">{leg.terminal}</p>

      <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-gray-100">
        <div>
          <p className="text-[11px] text-gray-400">Heure prévue</p>
          <p className="text-[14px] font-bold text-[#231f20]">
            {leg.scheduled}
          </p>
        </div>
        <div>
          <p className="text-[11px] text-gray-400">Heure estimée</p>
          <p
            className={`text-[14px] font-bold ${delayed ? "text-amber-600" : "text-[#231f20]"}`}
          >
            {leg.estimated}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-100 text-[12px] text-gray-500">
        <span className="flex items-center gap-1.5">
          <MapPin size={12} /> Porte {leg.gate}
        </span>
        {showBaggage && (
          <span className="flex items-center gap-1.5">
            <Luggage size={12} /> {leg.baggage}
          </span>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* RESULT — STEPS TIMELINE                                                  */
/* ---------------------------------------------------------------------- */

function StepsTimeline() {
  const current = FLIGHT_STATUS.currentStepIndex;
  return (
    <div className="bg-white border border-gray-200 rounded-sm p-5">
      <p className="text-sm font-bold text-[#231f20] mb-5">Étapes du vol</p>
      <div className="flex items-start">
        {STATUS_STEPS.map((step, i) => (
          <div
            key={step.key}
            className="flex-1 flex flex-col items-center text-center relative"
          >
            {i > 0 && (
              <div
                className={`absolute top-3.5 right-1/2 w-full h-0.5 ${
                  i <= current ? "bg-[#012169]" : "bg-gray-200"
                }`}
              />
            )}
            <span
              className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold ${
                i < current
                  ? "bg-[#012169] text-white"
                  : i === current
                    ? "bg-[#012169] text-white ring-4 ring-[#e6ecfa]"
                    : "bg-gray-200 text-gray-400"
              }`}
            >
              {i < current ? <CheckCircle2 size={14} /> : i + 1}
            </span>
            <p
              className={`text-[11px] font-semibold mt-2 px-1 ${
                i <= current ? "text-[#231f20]" : "text-gray-400"
              }`}
            >
              {step.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* RESULT — ALERT SIGNUP                                                   */
/* ---------------------------------------------------------------------- */

function AlertSignup() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-sm p-5">
      <div className="flex items-center gap-2 mb-2">
        <Bell size={16} className="text-[#012169]" />
        <p className="text-sm font-bold text-[#231f20]">
          Recevoir des alertes sur ce vol
        </p>
      </div>
      <p className="text-[12px] text-gray-500 mb-4">
        Soyez averti par e-mail en cas de retard, de changement de porte ou
        d'annulation.
      </p>

      {subscribed ? (
        <div className="flex items-center gap-2 text-green-700 text-[13px] font-semibold">
          <CheckCircle2 size={15} />
          Alertes activées pour {FLIGHT_STATUS.flightNo}
        </div>
      ) : (
        <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Adresse e-mail"
            className="flex-1 border border-gray-300 rounded px-3 py-2.5 text-sm outline-none focus:border-[#012169]"
          />
          <button
            type="submit"
            className="bg-[#012169] hover:bg-[#1041b4] transition-colors text-white font-semibold text-sm px-6 py-2.5 rounded tracking-wide"
          >
            ACTIVER LES ALERTES
          </button>
        </form>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* PAGE                                                                     */
/* ---------------------------------------------------------------------- */

export default function FlightStatus() {
  const [found, setFound] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState("à l'instant");

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f6f4] font-sans text-[#231f20]">
      <TopBar/>
      <Header />
      <PageBanner
        title="Statut du vol"
        description="Suivez en temps réel l'état de votre vol: horaires, porte d'embarquement et tapis à bagages."
      />

      <div className="flex-1 max-w-6xl mx-auto px-4 py-8 w-full">
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
            <StatusHeaderCard
              onReset={() => setFound(false)}
              onRefresh={() => setLastUpdated("à l'instant")}
              lastUpdated={lastUpdated}
            />
            <FlightProgressTrack />

            <div className="grid md:grid-cols-2 gap-5">
              <LegCard
                label="Départ"
                leg={FLIGHT_STATUS.departure}
                showBaggage={false}
              />
              <LegCard
                label="Arrivée"
                leg={FLIGHT_STATUS.arrival}
                showBaggage
              />
            </div>

            <StepsTimeline />
            <AlertSignup />

            <p className="text-[11px] text-gray-400">
              Les horaires affichés sont fournis à titre indicatif et peuvent
              évoluer jusqu'au départ du vol.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

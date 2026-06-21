import { useState } from "react";
import {
  Search,
  Lock,
  Plane,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  Luggage,
  Armchair,
  Utensils,
  ArrowUpCircle,
  Printer,
  RefreshCcw,
  MapPin,
  Calendar,
  AlertCircle,
  HelpCircle,
  Clock,
  X,
} from "lucide-react";
import Header from "../components/ui/Header.jsx";
import { BOOKING, ACTIONS } from "../data/constData.js";
import PageBanner from "../components/ui/PageBanner.jsx";
import TopBar from "../components/ui/TopBar.jsx";
import Footer from "../components/ui/Footer.jsx";

const PROMO_ITEMS = [
  {
    icon: CheckCircle2,
    title: "Enregistrement en ligne",
    text: "Enregistrez-vous dès 48h avant le départ et gagnez du temps à l'aéroport.",
  },
  {
    icon: Armchair,
    title: "Choisissez votre siège",
    text: "Sélectionnez le siège qui vous convient, du hublot au couloir.",
  },
  {
    icon: RefreshCcw,
    title: "Modifiez votre vol",
    text: "Changez vos dates de voyage facilement, où que vous soyez.",
  },
];

/* ---------------------------------------------------------------------- */
/* SEARCH FORM                                                             */
/* ---------------------------------------------------------------------- */

function SearchForm({ onFound, error, setError }) {
  const [tab, setTab] = useState("pnr");
  const [lastName, setLastName] = useState("");
  const [refType, setRefType] = useState("pnr");
  const [refValue, setRefValue] = useState("");
  const [skywardsId, setSkywardsId] = useState("");
  const [password, setPassword] = useState("");

  const submitPnr = (e) => {
    e.preventDefault();
    if (!lastName.trim() || !refValue.trim()) {
      setError(
        "Veuillez renseigner votre nom de famille et votre numéro de référence.",
      );
      return;
    }
    setError(null);
    onFound();
  };

  const submitSkywards = (e) => {
    e.preventDefault();
    if (!skywardsId.trim() || !password.trim()) {
      setError(
        "Veuillez renseigner votre identifiant Skybook Rewards et votre mot de passe.",
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
          onClick={() => setTab("pnr")}
          className={`flex-1 text-center py-3.5 text-[13px] font-semibold tracking-wide transition-colors ${
            tab === "pnr"
              ? "text-[#012169] border-b-2 border-[#012169]"
              : "text-gray-500 hover:text-[#231f20]"
          }`}
        >
          NUMÉRO DE RÉSERVATION
        </button>
        <button
          onClick={() => setTab("skywards")}
          className={`flex-1 text-center py-3.5 text-[13px] font-semibold tracking-wide transition-colors ${
            tab === "skywards"
              ? "text-[#012169] border-b-2 border-[#012169]"
              : "text-gray-500 hover:text-[#231f20]"
          }`}
        >
          SKYBOOK REWARDS
        </button>
      </div>

      {tab === "pnr" ? (
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

          <div className="flex flex-wrap items-center gap-5 text-[13px]">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                checked={refType === "pnr"}
                onChange={() => setRefType("pnr")}
                className="accent-[#012169]"
              />
              Numéro de réservation (PNR)
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                checked={refType === "eticket"}
                onChange={() => setRefType("eticket")}
                className="accent-[#012169]"
              />
              Numéro de billet électronique
            </label>
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-gray-600 mb-1">
              {refType === "pnr"
                ? "Numéro de réservation (6 caractères)"
                : "Numéro de billet électronique"}
            </label>
            <input
              value={refValue}
              onChange={(e) => setRefValue(e.target.value.toUpperCase())}
              placeholder={
                refType === "pnr" ? "ex. X7K9QP" : "ex. 176-2345678901"
              }
              className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm outline-none focus:border-[#012169] uppercase"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#012169] hover:bg-[#1041b4] transition-colors text-white font-semibold text-sm py-3 rounded tracking-wide flex items-center justify-center gap-2"
          >
            <Search size={16} />
            RECHERCHER MA RÉSERVATION
          </button>
        </form>
      ) : (
        <form onSubmit={submitSkywards} className="p-6 space-y-4">
          <div>
            <label className="block text-[12px] font-semibold text-gray-600 mb-1">
              Identifiant Skybook Rewards / E-mail
            </label>
            <input
              value={skywardsId}
              onChange={(e) => setSkywardsId(e.target.value)}
              placeholder="ex. EK220481933 ou e-mail"
              className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm outline-none focus:border-[#012169]"
            />
          </div>
          <div>
            <label className="block text-[12px] font-semibold text-gray-600 mb-1">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm outline-none focus:border-[#012169]"
            />
          </div>
          <div className="flex items-center justify-between text-[12px]">
            <label className="flex items-center gap-1.5">
              <input type="checkbox" className="accent-[#012169]" />
              Rester connecté
            </label>
            <a
              href="#"
              className="text-[#012169] font-semibold hover:underline"
            >
              Mot de passe oublié ?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-[#012169] hover:bg-[#1041b4] transition-colors text-white font-semibold text-sm py-3 rounded tracking-wide flex items-center justify-center gap-2"
          >
            <Lock size={15} />
            SE CONNECTER
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
          L'enregistrement en ligne ouvre 48h et se clôture 90 min avant le
          départ.
        </li>
        <li className="flex items-start gap-2">
          <ChevronRight size={13} className="mt-0.5 text-gray-400 shrink-0" />
          Munissez-vous d'un passeport valide au moins 6 mois après la date de
          retour.
        </li>
        <li className="flex items-start gap-2">
          <ChevronRight size={13} className="mt-0.5 text-gray-400 shrink-0" />
          Vous ne trouvez pas votre réservation ? Contactez notre service
          client.
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

/* ---------------------------------------------------------------------- */
/* PROMO ROW (shown before search)                                         */
/* ---------------------------------------------------------------------- */

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
/* BOOKING RESULT                                                          */
/* ---------------------------------------------------------------------- */

function BookingHeaderCard({ onReset }) {
  return (
    <div className="bg-white border border-gray-200 rounded-sm p-5 flex flex-wrap items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-[12px] text-gray-500">Numéro de réservation</p>
          <span className="text-sm font-extrabold text-[#231f20] tracking-wide">
            {BOOKING.pnr}
          </span>
          <span className="flex items-center gap-1 bg-green-50 text-green-700 text-[11px] font-semibold px-2 py-0.5 rounded-full">
            <CheckCircle2 size={12} /> {BOOKING.status}
          </span>
          {BOOKING.checkinOpen && (
            <span className="flex items-center gap-1 bg-[#e6ecfa] text-[#012169] text-[11px] font-semibold px-2 py-0.5 rounded-full">
              <Clock size={12} /> Enregistrement ouvert
            </span>
          )}
        </div>
        <p className="text-[13px] text-gray-500 mt-1">
          {BOOKING.passenger} · Skybook Rewards {BOOKING.skywardsNo}
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
  );
}

function SegmentCard({ segment }) {
  return (
    <div className="bg-white border border-gray-200 rounded-sm p-5">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <p className="text-[12px] font-bold tracking-widest text-gray-400 uppercase">
          {segment.label}
        </p>
        <span className="flex items-center gap-1 text-[12px] text-gray-500">
          <Calendar size={12} /> {segment.date}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-4 md:gap-8">
        <div className="flex items-center gap-2 text-[12px] font-semibold text-gray-500 w-20">
          <Plane size={14} className="text-[#012169]" />
          {segment.flightNo}
        </div>

        <div className="flex items-center gap-3 md:gap-6 flex-1 min-w-[220px]">
          <div>
            <p className="text-[16px] font-bold text-[#231f20]">
              {segment.departTime}
            </p>
            <p className="text-[11px] text-gray-400">{segment.from}</p>
          </div>
          <div className="flex-1 flex flex-col items-center min-w-[60px]">
            <p className="text-[11px] text-gray-400">{segment.duration}</p>
            <div className="w-full h-px bg-gray-300 relative my-1.5">
              <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#012169]" />
            </div>
            <p className="text-[11px] text-gray-400">{segment.aircraft}</p>
          </div>
          <div>
            <p className="text-[16px] font-bold text-[#231f20]">
              {segment.arriveTime}
            </p>
            <p className="text-[11px] text-gray-400">{segment.to}</p>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-gray-100 text-[12px] text-gray-500">
        <span className="flex items-center gap-1.5">
          <MapPin size={12} /> {segment.terminal}
        </span>
        <span className="flex items-center gap-1.5">
          <Armchair size={12} /> Siège : {segment.seat}
        </span>
        <span className="flex items-center gap-1.5">
          {segment.checkedIn ? (
            <>
              <CheckCircle2 size={12} className="text-green-600" /> Enregistré
            </>
          ) : (
            <>
              <AlertCircle size={12} /> Pas encore enregistré
            </>
          )}
        </span>
      </div>
    </div>
  );
}

function ActionsGrid() {
  return (
    <div className="bg-white border border-gray-200 rounded-sm p-5">
      <p className="text-sm font-bold text-[#231f20] mb-4">
        Gérer votre voyage
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {ACTIONS.map(({ icon: Icon, label, note }) => (
          <button
            key={label}
            className="flex flex-col items-start gap-2 border border-gray-200 rounded-sm p-3.5 text-left hover:border-[#012169] hover:bg-[#e6ecfa] transition-colors"
          >
            <span className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
              <Icon size={16} className="text-[#012169]" />
            </span>
            <span className="text-[12.5px] font-semibold text-[#231f20] leading-snug">
              {label}
            </span>
            <span className="text-[11px] text-gray-400 leading-snug">
              {note}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function BookingResult({ onReset }) {
  return (
    <div className="space-y-5">
      <BookingHeaderCard onReset={onReset} />
      <div className="grid md:grid-cols-2 gap-5">
        {BOOKING.segments.map((s) => (
          <SegmentCard key={s.id} segment={s} />
        ))}
      </div>
      <ActionsGrid />
    </div>
  );
}



/* ---------------------------------------------------------------------- */
/* PAGE                                                                     */
/* ---------------------------------------------------------------------- */

export default function ManageBooking() {
  const [found, setFound] = useState(false);
  const [error, setError] = useState(null);

  return (
    <div className="min-h-screen bg-[#f7f6f4] font-sans text-[#231f20]">
      <TopBar/>
      <Header />
      <PageBanner
        title="Gérer une réservation / s'enregistrer"
        description="Consultez votre réservation, enregistrez-vous en ligne, choisissez votre siège ou modifiez votre vol en quelques clics."
      />

      <div className="max-w-6xl mx-auto px-4 py-8 mb-39">
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
          <BookingResult onReset={() => setFound(false)} />
        )}
      </div>

      <Footer/>
    </div>
  );
}

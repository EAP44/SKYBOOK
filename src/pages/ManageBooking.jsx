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
import PageBanner from "../components/ui/PageBanner.jsx";
import TopBar from "../components/ui/TopBar.jsx";
import Footer from "../components/ui/Footer.jsx";
import { useNavigate } from "react-router-dom";
import LoginModal from "../components/ui/auth/LoginModal.jsx";
import { useAuth } from "../context/AuthContext";

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

/* ----------------------------SEARCH FORM------------------------------- */

function SearchForm({ error, setError, loading, setLoading, requireAuth }) {
  const navigate = useNavigate();

  const [tab, setTab] = useState("pnr");
  const [lastName, setLastName] = useState("");
  const [refType, setRefType] = useState("pnr");
  const [refValue, setRefValue] = useState("");
  const [skywardsId, setSkywardsId] = useState("");
  const [password, setPassword] = useState("");

  const submitPnr = async (e) => {
    e.preventDefault();

    if (!lastName.trim() || !refValue.trim()) {
      setError(
        "Veuillez renseigner votre nom de famille et votre numéro de référence.",
      );
      return;
    }

    setError(null);
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      requireAuth(() => {
        navigate("/booking/details");
      });
    } catch (err) {
      setError("Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  const submitSkywards = async (e) => {
    e.preventDefault();

    if (!skywardsId.trim() || !password.trim()) {
      setError(
        "Veuillez renseigner votre identifiant Skybook Rewards et votre mot de passe.",
      );
      return;
    }

    setError(null);
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      requireAuth(() => {
        navigate("/booking/details");
      });
    } catch (err) {
      setError("Identifiant ou mot de passe incorrect.");
    } finally {
      setLoading(false);
    }
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

/* --------------------------PROMO ROW---------------------------------- */

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

/* ------------------------------PAGE--------------------------------- */

export default function ManageBooking() {
  const [error, setError] = useState(null);
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
    <div className="min-h-screen bg-[#f7f6f4] font-sans text-[#231f20]">
      <TopBar />
      <Header />

      <PageBanner
        title="Gérer une réservation / s'enregistrer"
        description="Consultez votre réservation, enregistrez-vous en ligne, choisissez votre siège ou modifiez votre vol en quelques clics."
      />

      <div className="max-w-6xl mx-auto px-4 py-8 mb-39">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <SearchForm
              error={error}
              setError={setError}
              loading={loading}
              setLoading={setLoading}
              requireAuth={requireAuth}
            />
          </div>

          <div>
            <HelpPanel />
          </div>
        </div>

        <PromoRow />
      </div>
      {loading && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-[#012169] border-t-transparent rounded-full animate-spin" />
            <p className="text-[#012169] font-semibold">
              Recherche de votre réservation...
            </p>
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
      <Footer />
    </div>
  );
}

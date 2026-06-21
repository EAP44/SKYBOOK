import { useMemo, useState } from "react";
import {
  Plane,
  User,
  Users as UsersIcon,
  Mail,
  Phone,
  Pencil,
  Trash2,
  Plus,
  Check,
  X,
  AlertCircle,
  CheckCircle2,
  Calendar,
  MapPin,
  Clock,
  ShieldAlert,
} from "lucide-react";
import Header from "../components/ui/Header.jsx";
import Footer from "../components/ui/Footer.jsx";
import TopBar from "../components/ui/TopBar.jsx";

/* ---------------------------------------------------------------------- */
/* DATA                                                                    */
/* ---------------------------------------------------------------------- */

const BOOKING_INFO = { pnr: "X7K9QP", bookedOn: "12 mai 2026" };

const SEGMENTS = [
  {
    id: 1,
    label: "Vol aller",
    date: "Mer. 24 juin 2026",
    flightNo: "SB 751",
    from: "Casablanca (CMN)",
    to: "Dubai (DXB)",
    departTime: "03:35",
    arriveTime: "13:25",
    terminal: "Terminal 1",
    duration: "7 h 50",
  },
  {
    id: 2,
    label: "Vol retour",
    date: "Mer. 1 juil. 2026",
    flightNo: "SB 752",
    from: "Dubai (DXB)",
    to: "Casablanca (CMN)",
    departTime: "09:35",
    arriveTime: "15:10",
    terminal: "Terminal 3",
    duration: "7 h 35",
  },
];

const INITIAL_PASSENGERS = [
  {
    id: 1,
    firstName: "Ayoub",
    lastName: "Benali",
    type: "Adulte",
    passport: "AB1234567",
    seatOutbound: "24K",
    seatReturn: "Non attribué",
  },
];

const INITIAL_CONTACT = { email: "ayoub.benali@example.com", phone: "+212 6 12 34 56 78" };

const INITIAL_SERVICES = [
  { id: "s1", label: "Repas végétarien", price: 0 },
  { id: "s2", label: "+1 bagage en soute (23 kg)", price: 450 },
  { id: "s3", label: "Wi-Fi — Pack illimité", price: 180 },
];

const CATALOG_SERVICES = [
  { key: "c1", label: "Sélection de siège — espace pour les jambes", price: 350 },
  { key: "c2", label: "Accès salon — 1 passager", price: 600 },
  { key: "c3", label: "Assurance annulation", price: 120 },
  { key: "c4", label: "+1 bagage en soute (32 kg)", price: 650 },
];

const BASE_FARE_PER_PAX = 9771;
const MAX_PASSENGERS = 9;

const fmt = (n) => n.toLocaleString("fr-FR");

/* ---------------------------------------------------------------------- */
/* BANNER                                                                   */
/* ---------------------------------------------------------------------- */

function PageBanner({ status }) {
  return (
    <div className="bg-[#231f20] text-white">
      <div className="max-w-6xl mx-auto px-4 py-9">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl md:text-3xl font-bold">Votre réservation</h1>
          <span className="text-sm font-extrabold tracking-wide bg-white/10 px-3 py-1 rounded">
            {BOOKING_INFO.pnr}
          </span>
          <span
            className={`flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full ${
              status === "Annulée" ? "bg-red-500/20 text-red-300" : "bg-green-500/20 text-green-300"
            }`}
          >
            <CheckCircle2 size={12} /> {status}
          </span>
        </div>
        <p className="text-gray-300 text-sm mt-2 max-w-xl">
          Consultez et modifiez les informations de votre réservation: passagers, coordonnées, services et vols.
        </p>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* PASSENGERS — CRUD                                                       */
/* ---------------------------------------------------------------------- */

function PassengerForm({ initial, onSave, onCancel, disabled }) {
  const [form, setForm] = useState(
    initial || { firstName: "", lastName: "", type: "Adulte", passport: "", seatOutbound: "", seatReturn: "" }
  );

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.firstName.trim() || !form.lastName.trim() || !form.passport.trim()) return;
    onSave(form);
  };

  return (
    <form onSubmit={submit} className="border border-[#012169] bg-[#e6ecfa] rounded-sm p-4 space-y-3">
      <div className="grid sm:grid-cols-2 gap-3">
        <input
          value={form.firstName}
          onChange={set("firstName")}
          placeholder="Prénom"
          disabled={disabled}
          className="border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#012169]"
        />
        <input
          value={form.lastName}
          onChange={set("lastName")}
          placeholder="Nom"
          disabled={disabled}
          className="border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#012169]"
        />
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        <select
          value={form.type}
          onChange={set("type")}
          disabled={disabled}
          className="border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#012169] bg-white"
        >
          <option>Adulte</option>
          <option>Enfant</option>
          <option>Bébé</option>
        </select>
        <input
          value={form.passport}
          onChange={set("passport")}
          placeholder="N° de passeport"
          disabled={disabled}
          className="border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#012169]"
        />
        <input
          value={form.seatOutbound}
          onChange={set("seatOutbound")}
          placeholder="Siège aller (ex. 24K)"
          disabled={disabled}
          className="border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#012169]"
        />
      </div>
      <div className="flex items-center justify-end gap-2 pt-1">
        <button
          type="button"
          onClick={onCancel}
          className="text-[13px] font-semibold text-gray-500 hover:text-[#231f20] px-3 py-2"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={disabled}
          className="flex items-center gap-1.5 bg-[#012169] hover:bg-[#1041b4] transition-colors text-white font-semibold text-[13px] px-4 py-2 rounded"
        >
          <Check size={14} />
          Enregistrer
        </button>
      </div>
    </form>
  );
}

function PassengerRow({ passenger, onEdit, onRemove, canRemove, disabled }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border border-gray-200 rounded-sm p-4">
      <div className="flex items-center gap-3">
        <span className="w-9 h-9 rounded-full bg-[#e6ecfa] flex items-center justify-center shrink-0">
          <User size={16} className="text-[#012169]" />
        </span>
        <div>
          <p className="text-[13.5px] font-bold text-[#231f20]">
            {passenger.firstName} {passenger.lastName}
            <span className="ml-2 text-[11px] font-semibold text-gray-400">{passenger.type}</span>
          </p>
          <p className="text-[12px] text-gray-500 mt-0.5">
            Passeport {passenger.passport} · Siège aller {passenger.seatOutbound || "—"} · Siège retour{" "}
            {passenger.seatReturn || "—"}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onEdit}
          disabled={disabled}
          className="flex items-center gap-1.5 text-[12px] font-semibold text-[#012169] border border-[#012169] rounded px-3 py-1.5 hover:bg-[#e6ecfa] disabled:opacity-40"
        >
          <Pencil size={12} />
          Modifier
        </button>
        {canRemove && (
          <button
            onClick={onRemove}
            disabled={disabled}
            className="flex items-center gap-1.5 text-[12px] font-semibold text-red-600 border border-red-200 rounded px-3 py-1.5 hover:bg-red-50 disabled:opacity-40"
          >
            <Trash2 size={12} />
            Retirer
          </button>
        )}
      </div>
    </div>
  );
}

function PassengersSection({ passengers, setPassengers, disabled }) {
  const [editingId, setEditingId] = useState(null);
  const [adding, setAdding] = useState(false);

  const updatePassenger = (id, form) => {
    setPassengers((prev) => prev.map((p) => (p.id === id ? { ...p, ...form } : p)));
    setEditingId(null);
  };

  const addPassenger = (form) => {
    setPassengers((prev) => [...prev, { ...form, id: Date.now() }]);
    setAdding(false);
  };

  const removePassenger = (id) => setPassengers((prev) => prev.filter((p) => p.id !== id));

  return (
    <div className="bg-white border border-gray-200 rounded-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <UsersIcon size={17} className="text-[#012169]" />
          <p className="text-sm font-bold text-[#231f20]">Passagers ({passengers.length})</p>
        </div>
        {passengers.length < MAX_PASSENGERS && !adding && (
          <button
            onClick={() => setAdding(true)}
            disabled={disabled}
            className="flex items-center gap-1.5 text-[12px] font-semibold text-[#012169] border border-[#012169] rounded px-3 py-1.5 hover:bg-[#e6ecfa] disabled:opacity-40"
          >
            <Plus size={13} />
            Ajouter un passager
          </button>
        )}
      </div>

      <div className="space-y-3">
        {passengers.map((p) =>
          editingId === p.id ? (
            <PassengerForm
              key={p.id}
              initial={p}
              disabled={disabled}
              onSave={(form) => updatePassenger(p.id, form)}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <PassengerRow
              key={p.id}
              passenger={p}
              disabled={disabled}
              canRemove={passengers.length > 1}
              onEdit={() => setEditingId(p.id)}
              onRemove={() => removePassenger(p.id)}
            />
          )
        )}

        {adding && (
          <PassengerForm
            disabled={disabled}
            onSave={addPassenger}
            onCancel={() => setAdding(false)}
          />
        )}
      </div>

      <p className="text-[11px] text-gray-400 mt-3">Maximum {MAX_PASSENGERS} passagers par réservation.</p>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* CONTACT — UPDATE                                                        */
/* ---------------------------------------------------------------------- */

function ContactSection({ contact, setContact, disabled }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(contact);

  const save = (e) => {
    e.preventDefault();
    setContact(form);
    setEditing(false);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-bold text-[#231f20]">Coordonnées</p>
        {!editing && (
          <button
            onClick={() => {
              setForm(contact);
              setEditing(true);
            }}
            disabled={disabled}
            className="flex items-center gap-1.5 text-[12px] font-semibold text-[#012169] border border-[#012169] rounded px-3 py-1.5 hover:bg-[#e6ecfa] disabled:opacity-40"
          >
            <Pencil size={12} />
            Modifier
          </button>
        )}
      </div>

      {editing ? (
        <form onSubmit={save} className="space-y-3">
          <div>
            <label className="block text-[12px] font-semibold text-gray-600 mb-1">E-mail</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm outline-none focus:border-[#012169]"
            />
          </div>
          <div>
            <label className="block text-[12px] font-semibold text-gray-600 mb-1">Téléphone</label>
            <input
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm outline-none focus:border-[#012169]"
            />
          </div>
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="text-[13px] font-semibold text-gray-500 hover:text-[#231f20] px-3 py-2"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 bg-[#012169] hover:bg-[#1041b4] transition-colors text-white font-semibold text-[13px] px-4 py-2 rounded"
            >
              <Check size={14} />
              Enregistrer
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-2.5 text-[13px] text-gray-600">
          <p className="flex items-center gap-2">
            <Mail size={14} className="text-gray-400" />
            {contact.email}
          </p>
          <p className="flex items-center gap-2">
            <Phone size={14} className="text-gray-400" />
            {contact.phone}
          </p>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* FLIGHTS — READ ONLY                                                     */
/* ---------------------------------------------------------------------- */

function SegmentCard({ segment }) {
  return (
    <div className="border border-gray-200 rounded-sm p-4">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <p className="text-[11px] font-bold tracking-widest text-gray-400 uppercase">{segment.label}</p>
        <span className="flex items-center gap-1 text-[12px] text-gray-500">
          <Calendar size={12} /> {segment.date}
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-3 md:gap-6">
        <div className="flex items-center gap-2 text-[12px] font-semibold text-gray-500 w-20">
          <Plane size={14} className="text-[#012169]" />
          {segment.flightNo}
        </div>
        <div className="flex items-center gap-3 md:gap-6 flex-1 min-w-[200px]">
          <div>
            <p className="text-[15px] font-bold text-[#231f20]">{segment.departTime}</p>
            <p className="text-[11px] text-gray-400">{segment.from}</p>
          </div>
          <div className="flex-1 flex flex-col items-center min-w-[60px]">
            <p className="text-[11px] text-gray-400 flex items-center gap-1">
              <Clock size={11} /> {segment.duration}
            </p>
            <div className="w-full h-px bg-gray-300 relative my-1.5">
              <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#012169]" />
            </div>
          </div>
          <div>
            <p className="text-[15px] font-bold text-[#231f20]">{segment.arriveTime}</p>
            <p className="text-[11px] text-gray-400">{segment.to}</p>
          </div>
        </div>
      </div>
      <p className="flex items-center gap-1.5 text-[12px] text-gray-500 mt-3 pt-3 border-t border-gray-100">
        <MapPin size={12} /> {segment.terminal}
      </p>
    </div>
  );
}

function FlightsSection() {
  return (
    <div className="bg-white border border-gray-200 rounded-sm p-5">
      <p className="text-sm font-bold text-[#231f20] mb-4">Vols</p>
      <div className="grid md:grid-cols-2 gap-4">
        {SEGMENTS.map((s) => (
          <SegmentCard key={s.id} segment={s} />
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* SERVICES — CREATE / DELETE                                              */
/* ---------------------------------------------------------------------- */

function ServicesSection({ services, setServices, disabled }) {
  const [showCatalog, setShowCatalog] = useState(false);

  const removeService = (id) => setServices((prev) => prev.filter((s) => s.id !== id));

  const addService = (item) => {
    setServices((prev) => [...prev, { id: `s-${item.key}-${Date.now()}`, label: item.label, price: item.price }]);
  };

  const availableCatalog = CATALOG_SERVICES.filter(
    (c) => !services.some((s) => s.label === c.label)
  );

  return (
    <div className="bg-white border border-gray-200 rounded-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-bold text-[#231f20]">Services additionnels</p>
        {!showCatalog && availableCatalog.length > 0 && (
          <button
            onClick={() => setShowCatalog(true)}
            disabled={disabled}
            className="flex items-center gap-1.5 text-[12px] font-semibold text-[#012169] border border-[#012169] rounded px-3 py-1.5 hover:bg-[#e6ecfa] disabled:opacity-40"
          >
            <Plus size={13} />
            Ajouter un service
          </button>
        )}
      </div>

      {services.length === 0 ? (
        <p className="text-[13px] text-gray-400">Aucun service additionnel pour le moment.</p>
      ) : (
        <div className="space-y-2.5">
          {services.map((s) => (
            <div
              key={s.id}
              className="flex items-center justify-between gap-3 border border-gray-200 rounded-sm px-3.5 py-3"
            >
              <div>
                <p className="text-[13px] font-semibold text-[#231f20]">{s.label}</p>
                <p className="text-[12px] text-gray-400">{s.price === 0 ? "Inclus" : `MAD ${fmt(s.price)}`}</p>
              </div>
              <button
                onClick={() => removeService(s.id)}
                disabled={disabled}
                className="flex items-center gap-1.5 text-[12px] font-semibold text-red-600 border border-red-200 rounded px-3 py-1.5 hover:bg-red-50 disabled:opacity-40"
              >
                <Trash2 size={12} />
                Retirer
              </button>
            </div>
          ))}
        </div>
      )}

      {showCatalog && (
        <div className="mt-4 border-t border-gray-100 pt-4">
          <div className="flex items-center justify-between mb-2.5">
            <p className="text-[12px] font-semibold text-gray-500">Services disponibles</p>
            <button onClick={() => setShowCatalog(false)} className="text-gray-400 hover:text-[#231f20]">
              <X size={14} />
            </button>
          </div>
          <div className="space-y-2">
            {availableCatalog.map((c) => (
              <div
                key={c.key}
                className="flex items-center justify-between gap-3 border border-gray-200 rounded-sm px-3.5 py-2.5"
              >
                <div>
                  <p className="text-[13px] font-semibold text-[#231f20]">{c.label}</p>
                  <p className="text-[12px] text-gray-400">MAD {fmt(c.price)}</p>
                </div>
                <button
                  onClick={() => addService(c)}
                  disabled={disabled}
                  className="flex items-center gap-1.5 text-[12px] font-semibold bg-[#012169] hover:bg-[#1041b4] text-white rounded px-3 py-1.5 disabled:opacity-40"
                >
                  <Plus size={12} />
                  Ajouter
                </button>
              </div>
            ))}
            {availableCatalog.length === 0 && (
              <p className="text-[12px] text-gray-400">Tous les services disponibles ont déjà été ajoutés.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* SUMMARY SIDEBAR                                                         */
/* ---------------------------------------------------------------------- */

function SummarySidebar({ passengerCount, services, status, onSave, onCancelBooking, saved, disabled }) {
  const fareTotal = passengerCount * BASE_FARE_PER_PAX;
  const servicesTotal = services.reduce((sum, s) => sum + s.price, 0);
  const total = fareTotal + servicesTotal;

  return (
    <div className="space-y-4 sticky top-20">
      <div className="bg-white border border-gray-200 rounded-sm p-5">
        <p className="text-sm font-bold text-[#231f20] mb-4">Récapitulatif</p>
        <div className="space-y-2 text-[13px] text-gray-600">
          <div className="flex items-center justify-between">
            <span>Tarif de base ({passengerCount} pax)</span>
            <span className="font-semibold text-[#231f20]">MAD {fmt(fareTotal)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Services additionnels</span>
            <span className="font-semibold text-[#231f20]">MAD {fmt(servicesTotal)}</span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-200">
          <span className="text-[13px] font-bold text-[#231f20]">Total</span>
          <span className="text-[18px] font-extrabold text-[#012169]">MAD {fmt(total)}</span>
        </div>

        <button
          onClick={onSave}
          disabled={disabled}
          className="w-full mt-4 bg-[#012169] hover:bg-[#1041b4] transition-colors text-white font-semibold text-sm py-2.5 rounded tracking-wide disabled:opacity-40"
        >
          ENREGISTRER LES MODIFICATIONS
        </button>

        {saved && (
          <p className="flex items-center gap-1.5 text-[12px] font-semibold text-green-700 mt-2.5">
            <CheckCircle2 size={13} />
            Modifications enregistrées
          </p>
        )}
      </div>

      {status !== "Annulée" && (
        <div className="bg-white border border-red-200 rounded-sm p-5">
          <div className="flex items-center gap-2 mb-2">
            <ShieldAlert size={16} className="text-red-600" />
            <p className="text-[13px] font-bold text-[#231f20]">Annuler la réservation</p>
          </div>
          <p className="text-[12px] text-gray-500 mb-3">
            Cette action est définitive et peut être soumise à des conditions tarifaires.
          </p>
          <button
            onClick={onCancelBooking}
            className="w-full text-[13px] font-semibold text-red-600 border border-red-300 rounded py-2 hover:bg-red-50"
          >
            Annuler ma réservation
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* CANCEL CONFIRMATION MODAL                                               */
/* ---------------------------------------------------------------------- */

function CancelModal({ onConfirm, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-sm max-w-sm w-full p-6">
        <div className="flex items-center gap-2 mb-3">
          <AlertCircle size={20} className="text-red-600" />
          <p className="text-base font-bold text-[#231f20]">Confirmer l'annulation</p>
        </div>
        <p className="text-[13px] text-gray-600 mb-5">
          Voulez-vous vraiment annuler la réservation {BOOKING_INFO.pnr} ? Cette action est irréversible.
        </p>
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="text-[13px] font-semibold text-gray-500 hover:text-[#231f20] px-4 py-2"
          >
            Retour
          </button>
          <button
            onClick={onConfirm}
            className="text-[13px] font-semibold bg-red-600 hover:bg-red-700 text-white rounded px-4 py-2"
          >
            Oui, annuler la réservation
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* PAGE                                                                     */
/* ---------------------------------------------------------------------- */

export default function BookingDetails() {
  const [passengers, setPassengers] = useState(INITIAL_PASSENGERS);
  const [contact, setContact] = useState(INITIAL_CONTACT);
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [status, setStatus] = useState("Confirmée");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [saved, setSaved] = useState(false);

  const disabled = status === "Annulée";

  const handleSave = () => {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  const handleCancelBooking = () => {
    setStatus("Annulée");
    setShowCancelModal(false);
  };

  const passengerCount = useMemo(() => passengers.length, [passengers]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f6f4] font-sans text-[#231f20]">
      <TopBar/>
      <Header />
      <PageBanner status={status} />

      <div className="flex-1 max-w-6xl mx-auto px-4 py-8 w-full">
        {disabled && (
          <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 text-[13px] rounded px-4 py-3 mb-5">
            <AlertCircle size={15} className="mt-0.5 shrink-0" />
            Cette réservation a été annulée. Les informations ci-dessous ne sont plus modifiables.
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-5">
            <PassengersSection passengers={passengers} setPassengers={setPassengers} disabled={disabled} />
            <ContactSection contact={contact} setContact={setContact} disabled={disabled} />
            <FlightsSection />
            <ServicesSection services={services} setServices={setServices} disabled={disabled} />
          </div>

          <div className="md:col-span-1">
            <SummarySidebar
              passengerCount={passengerCount}
              services={services}
              status={status}
              onSave={handleSave}
              onCancelBooking={() => setShowCancelModal(true)}
              saved={saved}
              disabled={disabled}
            />
          </div>
        </div>
      </div>

      <Footer />

      {showCancelModal && (
        <CancelModal onConfirm={handleCancelBooking} onClose={() => setShowCancelModal(false)} />
      )}
    </div>
  );
}
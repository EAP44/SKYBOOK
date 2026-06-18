import { useState } from "react";
import {
  ArrowLeftRight,
  Calendar,
  Users as UsersIcon,
  ChevronDown,
} from "lucide-react";
import { CLASSES, SEARCH_TABS } from "../../data/constData";

function PassengerClassRow({ tripType, setTripType }) {
  return (
    <div className="flex flex-wrap items-center gap-5 text-sm">
      <label className="flex items-center gap-1.5 cursor-pointer">
        <input
          type="radio"
          checked={tripType === "roundtrip"}
          onChange={() => setTripType("roundtrip")}
          className="accent-[#012169]"
        />
        Aller-retour
      </label>
      <label className="flex items-center gap-1.5 cursor-pointer">
        <input
          type="radio"
          checked={tripType === "oneway"}
          onChange={() => setTripType("oneway")}
          className="accent-[#012169]"
        />
        Aller simple
      </label>
    </div>
  );
}

function SearchPanelFlight() {
  const [tripType, setTripType] = useState("roundtrip");
  const [origin, setOrigin] = useState("Casablanca (CMN)");
  const [destination, setDestination] = useState("Dubai (DXB)");
  const [travelClass, setTravelClass] = useState(CLASSES[0]);

  const swap = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  return (
    <div className="p-5 md:p-7">
      <PassengerClassRow tripType={tripType} setTripType={setTripType} />

      <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-3">
        <div className="md:col-span-3 relative border border-gray-300 rounded px-3 py-2.5">
          <span className="block text-[11px] text-gray-500">
            Aéroport de départ
          </span>
          <input
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="w-full text-sm font-semibold outline-none"
          />
        </div>

        <div className="md:col-span-1 flex items-center justify-center -mx-2">
          <button
            onClick={swap}
            aria-label="Inverser origine et destination"
            className="rounded-full border border-gray-300 p-2 bg-white hover:bg-gray-50 z-10"
          >
            <ArrowLeftRight size={16} className="text-[#012169]" />
          </button>
        </div>

        <div className="md:col-span-3 relative border border-gray-300 rounded px-3 py-2.5">
          <span className="block text-[11px] text-gray-500">
            Aéroport d'arrivée
          </span>
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full text-sm font-semibold outline-none"
          />
        </div>

        <div className="md:col-span-2 relative border border-gray-300 rounded px-3 py-2.5">
          <span className=" text-[11px] text-gray-500 flex items-center gap-1">
            <Calendar size={11} /> Départ
          </span>
          <input
            type="text"
            placeholder="jj/mm/aaaa"
            className="w-full text-sm font-semibold outline-none placeholder:text-gray-400"
          />
        </div>

        <div
          className={`md:col-span-2 relative border rounded px-3 py-2.5 ${
            tripType === "oneway"
              ? "border-gray-200 opacity-40"
              : "border-gray-300"
          }`}
        >
          <span className=" text-[11px] text-gray-500 flex items-center gap-1">
            <Calendar size={11} /> Retour
          </span>
          <input
            type="text"
            disabled={tripType === "oneway"}
            placeholder="jj/mm/aaaa"
            className="w-full text-sm font-semibold outline-none placeholder:text-gray-400 disabled:bg-transparent"
          />
        </div>

        <div className="md:col-span-1 relative border border-gray-300 rounded px-3 py-2.5">
          <span className=" text-[11px] text-gray-500 flex items-center gap-1">
            <UsersIcon size={11} /> Passagers
          </span>
          <span className="text-sm font-semibold">1</span>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <div className="relative">
          <select
            value={travelClass}
            onChange={(e) => setTravelClass(e.target.value)}
            className="text-sm border border-gray-300 rounded px-3 py-2 pr-8 appearance-none bg-white font-semibold"
          >
            {CLASSES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <ChevronDown
            size={14}
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
          />
        </div>

        <button className="bg-[#012169] hover:bg-[#1041b4] transition-colors text-white font-semibold text-sm px-10 py-3 rounded tracking-wide">
          RECHERCHER UN VOL
        </button>
      </div>
    </div>
  );
}

function SearchPanelManage() {
  return (
    <div className="p-7 text-sm text-gray-600">
      <p className="mb-4">
        Accédez à votre réservation pour la consulter, la modifier ou vous
        enregistrer en ligne.
      </p>
      <div className="grid md:grid-cols-3 gap-3">
        <input
          placeholder="Nom de famille"
          className="border border-gray-300 rounded px-3 py-2.5 text-sm"
        />
        <input
          placeholder="Numéro de réservation"
          className="border border-gray-300 rounded px-3 py-2.5 text-sm"
        />
        <button className="bg-[#012169] hover:bg-[#1041b4] text-white font-semibold text-sm px-6 py-2.5 rounded tracking-wide">
          RECHERCHER
        </button>
      </div>
    </div>
  );
}

function SearchPanelServices() {
  return (
    <div className="p-7 text-sm text-gray-600">
      <p className="mb-4">
        Connectez-vous pour voir les services disponibles sur votre prochain
        vol, ou recherchez par itinéraire.
      </p>
      <div className="grid md:grid-cols-3 gap-3">
        <input
          placeholder="Aéroport de départ"
          className="border border-gray-300 rounded px-3 py-2.5 text-sm"
        />
        <input
          placeholder="Aéroport d'arrivée"
          className="border border-gray-300 rounded px-3 py-2.5 text-sm"
        />
        <button className="bg-[#012169] hover:bg-[#1041b4] text-white font-semibold text-sm px-6 py-2.5 rounded tracking-wide">
          VOIR LES SERVICES
        </button>
      </div>
    </div>
  );
}

function SearchPanelStatus() {
  return (
    <div className="p-7 text-sm text-gray-600">
      <p className="mb-4">
        Vérifiez le statut d'un vol par itinéraire ou par numéro de vol.
      </p>
      <div className="grid md:grid-cols-3 gap-3">
        <input
          placeholder="Aéroport de départ"
          className="border border-gray-300 rounded px-3 py-2.5 text-sm"
        />
        <input
          placeholder="Aéroport d'arrivée"
          className="border border-gray-300 rounded px-3 py-2.5 text-sm"
        />
        <button className="bg-[#012169] hover:bg-[#1041b4] text-white font-semibold text-sm px-6 py-2.5 rounded tracking-wide">
          VÉRIFIER LE STATUT
        </button>
      </div>
    </div>
  );
}

export default function SearchWidget() {
  const [tab, setTab] = useState(0);
  const panels = [
    <SearchPanelFlight key={0} />,
    <SearchPanelManage key={1} />,
    <SearchPanelServices key={2} />,
    <SearchPanelStatus key={3} />,
  ];

  return (
    <div className="relative z-20 max-w-5xl mx-auto px-4 -mt-12 md:-mt-16">
      <div className="bg-white shadow-xl rounded-sm overflow-hidden">
        <div className="flex overflow-x-auto border-b border-gray-200">
          {SEARCH_TABS.map((t, i) => (
            <button
              key={t}
              onClick={() => setTab(i)}
              className={`whitespace-nowrap px-5 py-3.5 text-[13px] font-semibold tracking-wide transition-colors ${
                tab === i
                  ? "text-[#012169] border-b-2 border-[#012169] bg-white"
                  : "text-gray-500 hover:text-[#231f20] bg-gray-50"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        {panels[tab]}
      </div>
    </div>
  );
}
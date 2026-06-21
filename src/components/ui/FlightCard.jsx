import { TRIP, fmt } from "../../data/constData";
import { Plane, Clock, ChevronDown, ChevronUp, Briefcase, Check } from "lucide-react";

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

export default function FlightCard({ flight, expanded, onToggle, selected, onSelectFare }) {
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

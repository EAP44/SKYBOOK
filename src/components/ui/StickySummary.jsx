import { X } from "lucide-react";
import { fmt } from "../../data/constData";

export default function StickySummary({ selected, onClear }) {
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

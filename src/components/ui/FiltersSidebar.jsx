import { SlidersHorizontal } from "lucide-react";
import { TIME_SLOTS, fmt } from "../../data/constData";

function FilterSection({ title, children }) {
  return (
    <div className="border-b border-gray-200 py-4">
      <p className="text-[13px] font-bold text-[#231f20] mb-3">{title}</p>
      {children}
    </div>
  );
}

export default function FiltersSidebar({ stopFilter, setStopFilter, timeFilter, toggleTimeFilter, priceMax, setPriceMax }) {
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

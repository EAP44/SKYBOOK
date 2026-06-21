import { ChevronLeft, ChevronRight } from "lucide-react";
import { DATES, fmt } from "../../data/constData";

export default function DateCarousel({ selectedIdx, setSelectedIdx }) {
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

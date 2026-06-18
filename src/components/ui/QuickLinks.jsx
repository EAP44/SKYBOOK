import { QUICK_LINKS } from "../../data/constData";

export default function QuickLinks() {
  return (
    <div className="max-w-5xl mx-auto px-4 mt-8 mb-2">
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
        {QUICK_LINKS.map(({ label, icon: Icon }) => (
          <a
            key={label}
            href="#"
            className="flex flex-col items-center gap-2 text-[12px] font-semibold text-[#231f20] hover:text-[#012169] w-20 text-center"
          >
            <span className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center">
              <Icon size={18} />
            </span>
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}

import { EXPERIENCE_CARDS } from "../../data/constData";

export default function ExperienceSection() {
  return (
    <section className="bg-[#f7f6f4] py-14">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-xs font-semibold tracking-widest text-[#012169] mb-2">
          VOYAGER AVEC SKYBOOK
        </p>
        <h2 className="text-2xl md:text-[28px] font-bold text-[#231f20] max-w-xl">
          Faites de votre voyage une aventure exceptionnelle
        </h2>
        <p className="text-gray-600 mt-3 max-w-xl text-sm">
          Découvrez l'expérience Skybook et planifiez un voyage inoubliable de
          A à Z.
        </p>

        <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {EXPERIENCE_CARDS.map((c) => (
            <a
              key={c.title}
              href="#"
              className="group relative block h-64 overflow-hidden rounded-sm"
            >
              <img
                src={c.img}
                alt={c.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 from-black/80 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <p className="text-[10px] font-semibold tracking-widest opacity-80">
                  {c.tag}
                </p>
                <p className="text-sm font-bold mt-1">{c.title}</p>
                <p className="text-[11px] mt-1 underline opacity-90">
                  En savoir plus
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

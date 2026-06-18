import { ABOUT_GRID } from "../../data/constData";

export default function AboutUsGrid() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-14">
      <h2 className="text-2xl md:text-[28px] font-bold text-[#231f20]">
        À propos de nous
      </h2>
      <p className="text-gray-600 mt-2 text-sm max-w-lg">
        En savoir plus sur notre histoire, nos activités et nos initiatives en
        matière de développement durable
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {ABOUT_GRID.map((a) => (
          <a key={a.title} href="#" className="group block">
            <div className="overflow-hidden rounded-sm">
              <img
                src={a.img}
                alt={a.title}
                className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <p className="text-sm font-semibold mt-2.5 text-[#231f20]">
              {a.title}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
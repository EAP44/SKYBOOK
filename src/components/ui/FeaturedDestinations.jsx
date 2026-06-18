import { useState } from "react";
import { ChevronRight, MapPin, Compass } from "lucide-react";

import {
    NAV_ITEMS,
    SEARCH_TABS,
    QUICK_LINKS,
    DESTINATIONS,
    EXPERIENCE_CARDS,
    ABOUT_GRID,
    FOOTER_COLUMNS,
    CLASSES,
} from "../../data/constData";

function DestinationCard({ d }) {
  return (
    <a href="#" className="group block">
      <div className="overflow-hidden rounded-sm">
        <img
          src={d.img}
          alt={d.city}
          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="pt-3">
        <p className="text-xs text-gray-500">{d.country}</p>
        <p className="text-base font-bold text-[#231f20]">{d.city}</p>
        <p className="text-xs text-gray-500 mt-1">
          Réserver jusqu'au 30 juin 26 · Classe Économique
        </p>
        <p className="text-sm mt-1">
          Aller-retour à partir de{" "}
          <span className="font-bold text-[#012169]">MAD {d.price}*</span>
        </p>
      </div>
    </a>
  );
}

export default function FeaturedDestinations() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-14">
      <h2 className="text-2xl md:text-[28px] font-bold text-[#231f20] mb-7">
        Destinations proposées au départ de Casablanca
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-9">
        {DESTINATIONS.map((d) => (
          <DestinationCard key={d.city} d={d} />
        ))}
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-9 gap-4">
        <a
          href="#"
          className="text-sm font-semibold text-[#012169] flex items-center gap-1 hover:underline"
        >
          Voir plus de tarifs <ChevronRight size={15} />
        </a>
        <p className="text-xs text-gray-400">*Offre soumise à conditions</p>
      </div>

      <div className="flex flex-wrap gap-6 mt-8 border-t border-gray-200 pt-7">
        <a
          href="#"
          className="text-sm font-semibold text-[#231f20] flex items-center gap-1 hover:text-[#012169]"
        >
          <MapPin size={15} /> Explorer d'autres destinations
        </a>
        <a
          href="#"
          className="text-sm font-semibold text-[#231f20] flex items-center gap-1 hover:text-[#012169]"
        >
          <Compass size={15} /> Trouvez l'inspiration sur notre carte du réseau
        </a>
      </div>
    </section>
  );
}

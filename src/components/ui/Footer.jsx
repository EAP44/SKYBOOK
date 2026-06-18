import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

import { FOOTER_COLUMNS } from "../../data/constData";

function Newsletter() {
  return (
    <div className="border-t border-white/10 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h3 className="text-white font-bold text-lg">
          S'abonner à nos offres spéciales
        </h3>
        <p className="text-gray-400 text-sm mt-1">
          Profitez de nos meilleurs tarifs et offres.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-4 max-w-md">
          <input
            type="email"
            placeholder="Adresse e-mail"
            className="flex-1 bg-transparent border border-gray-500 text-white placeholder:text-gray-400 rounded-sm px-3 py-2.5 text-sm outline-none focus:border-white"
          />
          <button className="bg-[#012169] hover:bg-[#1041b4] text-white font-semibold text-sm px-6 py-2.5 rounded-sm tracking-wide">
            S'ABONNER
          </button>
        </div>
      </div>
    </div>
  );
}

function FooterLinks() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
      {FOOTER_COLUMNS.map((col) => (
        <div key={col.title}>
          <p className="text-white font-bold text-sm mb-3">{col.title}</p>
          <ul className="space-y-2">
            {col.links.map((l) => (
              <li key={l}>
                <a
                  href="#"
                  className="text-gray-400 text-[13px] hover:text-white transition-colors"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function AppAndSocial() {
  const socials = [
    { Icon: FaFacebook, label: "FaFacebook" },
    { Icon: FaTwitter, label: "FaTwitter" },
    { Icon: FaLinkedin, label: "FaLinkedin" },
    { Icon: FaYoutube, label: "FaYoutube" },
    { Icon: FaInstagram, label: "FaInstagram" },
  ];

  return (
    <div className="border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-10 grid sm:grid-cols-2 gap-8">
        <div>
          <p className="text-white font-bold text-sm mb-1">App Skybook</p>
          <p className="text-gray-400 text-[13px] mb-3">
            Réservez et gérez vos vols partout où vous allez.
          </p>
          <div className="flex flex-wrap gap-3">
            <img
              src="https://c.ekstatic.net/ecl/logos/appstore/apple-fr.svg"
              alt="App Store"
              className="h-9"
            />
            <img
              src="https://c.ekstatic.net/ecl/logos/appstore/google-fr.svg"
              alt="Google Play"
              className="h-9"
            />
            <img
              src="https://c.ekstatic.net/ecl/logos/appstore/huawei-logo-french.svg"
              alt="Huawei App Gallery"
              className="h-9"
            />
          </div>
        </div>
        <div>
          <p className="text-white font-bold text-sm mb-1">
            Connectez-vous avec nous
          </p>
          <p className="text-gray-400 text-[13px] mb-3">
            Partagez votre expérience Skybook.
          </p>
          <div className="flex gap-3">
            {socials.map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-9 h-9 rounded-full border border-gray-500 flex items-center justify-center text-gray-300 hover:text-white hover:border-white transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function LegalBar() {
  const legal = [
    "Déclaration d'accessibilité",
    "Nous contacter",
    "Politique de confidentialité",
    "Conditions générales",
    "Politique en matière de cookies",
    "Cyber-sécurité",
    "Plan du site",
  ];
  return (
    <div className="border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {legal.map((l) => (
            <a
              key={l}
              href="#"
              className="text-gray-500 text-[12px] hover:text-white"
            >
              {l}
            </a>
          ))}
        </div>
        <p className="text-gray-500 text-[12px] mt-5">
          © 2026 The Skybook Group. Tous droits réservés.
        </p>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a]">
      <Newsletter />
      <FooterLinks />
      <AppAndSocial />
      <LegalBar />
    </footer>
  );
}
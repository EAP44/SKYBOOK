import {
  Car,
  Hotel,
  Compass,
  PlaneTakeoff,
  Users as UsersIcon,
  ShoppingBag,
  Utensils,
  Wifi,
  Luggage,
  Armchair,
  Coffee,
  ShieldCheck,
  CheckCircle2,
  ArrowUpCircle,
  RefreshCcw,
  Printer,
  AlertCircle,
} from "lucide-react";

const NAV_ITEMS = [
  { element: "ACCUEIL", href: "/" },
  { element: "RÉSERVER", href: "/booking/search-results" },
  { element: "GÉRER", href: "/booking/manage" },
  { element: "SERVICES DISPONIBLES", href: "/flight-services" },
  { element: "STATUT DU VOL", href: "/flight-status" },
  { element: "AIDE", href: "/booking/details" },
];

const SEARCH_TABS = [
  "Rechercher un vol",
  "Gérer une réservation/s'enregistrer",
  "Services disponibles sur votre vol",
  "Statut du vol",
];

const QUICK_LINKS = [
  { label: "Hôtels", icon: Hotel },
  { label: "Locations de voitures", icon: Car },
  { label: "Visites et activités", icon: Compass },
  { label: "Voiture avec chauffeur", icon: Car },
  { label: "Meet & Greet", icon: UsersIcon },
  { label: "Transferts à l'aéroport", icon: PlaneTakeoff },
];

const DESTINATIONS = [
  { country: "Chine", city: "Canton", price: "9,771", img: "https://picsum.photos/seed/canton-china/640/480" },
  { country: "Arabie saoudite", city: "Riyad", price: "9,820", img: "https://picsum.photos/seed/riyadh-ksa/640/480" },
  { country: "Égypte", city: "Le Caire", price: "11,244", img: "https://picsum.photos/seed/cairo-egypt/640/480" },
  { country: "Chine", city: "Hangzhou", price: "11,279", img: "https://picsum.photos/seed/hangzhou-china/640/480" },
  { country: "Indonésie", city: "Bali", price: "17,929", img: "https://picsum.photos/seed/bali-indonesia/640/480" },
  { country: "France", city: "Paris", price: "23,828", img: "https://picsum.photos/seed/paris-france/640/480" },
];

const EXPERIENCE_CARDS = [
  { tag: "DUBAI ET LES E.A.U.", title: "Découvrir Dubai", img: "https://picsum.photos/seed/discover-dubai/640/800" },
  { tag: "CARACTÉRISTIQUES DES CABINES", title: "Première Classe", img: "https://picsum.photos/seed/first-class-cabin/640/800" },
  { tag: "CARACTÉRISTIQUES DES CABINES", title: "Classe Affaires", img: "https://picsum.photos/seed/business-class-cabin/640/800" },
  { tag: "CARACTÉRISTIQUES DES CABINES", title: "Économie Premium", img: "https://picsum.photos/seed/premium-economy-cabin/640/800" },
  { tag: "CARACTÉRISTIQUES DES CABINES", title: "Classe Économique", img: "https://picsum.photos/seed/economy-class-cabin/640/800" },
];

const ABOUT_GRID = [
  { title: "Nos activités", img: "https://picsum.photos/seed/our-business/500/500" },
  { title: "Notre planète", img: "https://picsum.photos/seed/our-planet/500/500" },
  { title: "Notre personnel", img: "https://picsum.photos/seed/our-people/500/500" },
  { title: "Nos communautés", img: "https://picsum.photos/seed/our-communities/500/500" },
];

const FOOTER_COLUMNS = [
  { title: "À propos de nous", links: ["À propos de nous", "Carrières", "Espace média", "Notre planète", "Notre personnel", "Nos communautés"] },
  { title: "Aide", links: ["Aide et contact", "Mises à jour sur les voyages", "Assistance spéciale", "Forum aux questions"] },
  { title: "Réserver", links: ["Réserver un vol", "Services de voyage", "Transport", "Planifier votre voyage"] },
  { title: "Gérer", links: ["Enregistrement", "Gérer votre réservation", "Voiture avec chauffeur", "Statut du vol"] },
  { title: "Avant le départ", links: ["Bagages", "Informations visa et passeport", "Santé", "Informations sur le voyage"] },
  { title: "Nos destinations", links: ["Carte des destinations", "Afrique", "Asie-Pacifique", "Europe", "Les Amériques", "Moyen-Orient"] },
  { title: "Découvrez", links: ["Caractéristiques des cabines", "Boutique Skybook", "Divertissement à bord", "Repas", "Nos salons"] },
  { title: "Fidélité", links: ["Se connecter à Skybook Rewards", "S'inscrire à Skybook Rewards", "Nos partenaires", "Avantages Business Rewards"] },
];

const CLASSES = ["Toutes classes", "Classe Économique", "Économie Premium", "Classe Affaires", "Première Classe"];

const TRIP = {
  from: "Casablanca",
  fromCode: "CMN",
  to: "Dubai",
  toCode: "DXB",
  departLabel: "Mer. 24 juin 2026",
  returnLabel: "Mer. 1 juil. 2026",
  pax: "1 Adulte",
  cabin: "Classe Économique",
};

const DATES = [
  { day: "Lun", date: "22 juin", price: 9620 },
  { day: "Mar", date: "23 juin", price: 9410 },
  { day: "Mer", date: "24 juin", price: 9771, selected: true },
  { day: "Jeu", date: "25 juin", price: 10120 },
  { day: "Ven", date: "26 juin", price: 11340 },
  { day: "Sam", date: "27 juin", price: 10890 },
  { day: "Dim", date: "28 juin", price: 9990 },
];

const FARE_TEMPLATE = [
  {
    key: "special",
    name: "Special",
    baggage: "1 bagage en cabine · pas de bagage en soute",
    flex: "Non modifiable",
    seat: "Sélection de siège payante",
  },
  {
    key: "saver",
    name: "Saver",
    baggage: "1 bagage en cabine · 1 bagage en soute (30 kg)",
    flex: "Modification possible (frais applicables)",
    seat: "Sélection de siège payante",
  },
  {
    key: "flex",
    name: "Flex",
    baggage: "1 bagage en cabine · 1 bagage en soute (30 kg)",
    flex: "Changement de date gratuit",
    seat: "Sélection de siège gratuite",
  },
  {
    key: "flexplus",
    name: "Flex Plus",
    baggage: "1 bagage en cabine · 2 bagages en soute (30 kg)",
    flex: "Remboursable · changement gratuit",
    seat: "Sélection de siège gratuite + accès salon",
  },
];

function buildFlight(id, departTime, arriveTime, duration, flightNo, base) {
  return {
    id,
    flightNo,
    departTime,
    arriveTime,
    duration,
    stops: "Sans escale",
    aircraft: "Boeing 777-300ER",
    fares: FARE_TEMPLATE.map((f, i) => ({
      ...f,
      price: base + i * 1850 + (id % 2 === 0 ? 120 : 0),
    })),
  };
}

const FLIGHTS = [
  buildFlight(1, "03:35", "13:25", "7 h 50", "EK 751", 9771),
  buildFlight(2, "09:50", "19:45", "7 h 55", "EK 753", 10240),
  buildFlight(3, "14:20", "00:05 (+1)", "7 h 45", "EK 755", 10890),
  buildFlight(4, "22:10", "07:55 (+1)", "7 h 45", "EK 757", 9990),
];

const TIME_SLOTS = [
  { key: "early", label: "00h – 06h" },
  { key: "morning", label: "06h – 12h" },
  { key: "afternoon", label: "12h – 18h" },
  { key: "evening", label: "18h – 24h" },
];

const SORT_OPTIONS = [
  { key: "price", label: "Prix le plus bas" },
  { key: "duration", label: "Durée la plus courte" },
  { key: "departure", label: "Départ le plus tôt" },
];

const fmt = (n) => n.toLocaleString("fr-FR");

const PROMO_ITEMS = [
  {
    icon: Utensils,
    title: "Pré-commandez votre repas",
    text: "Choisissez votre menu spécial jusqu'à 24h avant le départ.",
  },
  {
    icon: Wifi,
    title: "Restez connecté",
    text: "Réservez votre forfait Wi-Fi à bord avant de voyager.",
  },
  {
    icon: ShoppingBag,
    title: "Boutique Duty Free",
    text: "Précommandez vos articles préférés et récupérez-les à bord.",
  },
];

const FLIGHT = {
  flightNo: "SB 751",
  date: "Mer. 24 juin 2026",
  from: "Casablanca (CMN)",
  to: "Dubai (DXB)",
  departTime: "03:35",
  arriveTime: "13:25",
  duration: "7 h 50",
  aircraft: "Boeing 777-300ER",
  passenger: "M. Ayoub ELAOUADI",
};

const SERVICE_CATEGORIES = [
  {
    id: "meals",
    icon: Utensils,
    title: "Repas & boissons",
    desc: "Pré-commandez votre repas spécial avant le vol.",
    badge: "Gratuit",
    options: [
      { key: "meal-veg", name: "Repas végétarien", price: 0 },
      { key: "meal-gf", name: "Repas sans gluten", price: 0 },
      { key: "meal-kosher", name: "Repas casher", price: 0 },
      { key: "meal-child", name: "Repas enfant", price: 0 },
    ],
  },
  {
    id: "baggage",
    icon: Luggage,
    title: "Bagages supplémentaires",
    desc: "Ajoutez un bagage en soute supplémentaire à votre réservation.",
    badge: "Payant",
    options: [
      { key: "bag-23", name: "+1 bagage en soute (23 kg)", price: 450 },
      { key: "bag-32", name: "+1 bagage en soute (32 kg)", price: 650 },
    ],
  },
  {
    id: "wifi",
    icon: Wifi,
    title: "Wi-Fi à bord",
    desc: "Restez connecté pendant votre vol avec nos forfaits data.",
    badge: "Dès MAD 90",
    options: [
      { key: "wifi-light", name: "Pack léger (10 Mo) — messagerie", price: 0 },
      { key: "wifi-data", name: "Pack data (500 Mo)", price: 90 },
      { key: "wifi-unlimited", name: "Pack illimité (vol entier)", price: 180 },
    ],
  },
  {
    id: "dutyfree",
    icon: ShoppingBag,
    title: "Boutique Duty Free",
    desc: "Précommandez parfums, cosmétiques et souvenirs, livrés à bord.",
    badge: "Pré-commande",
    options: [
      { key: "df-voucher", name: "Bon d'achat boutique MAD 200", price: 200 },
      { key: "df-perfume", name: "Coffret parfum collection", price: 550 },
    ],
  },
  {
    id: "seat",
    icon: Armchair,
    title: "Sélection de siège",
    desc: "Choisissez votre siège préféré pour plus de confort.",
    badge: "Dès MAD 150",
    options: [
      { key: "seat-standard", name: "Siège standard", price: 150 },
      { key: "seat-legroom", name: "Siège avec espace pour les jambes", price: 350 },
    ],
  },
  {
    id: "lounge",
    icon: Coffee,
    title: "Accès salon",
    desc: "Profitez du confort de nos salons avant le départ.",
    badge: "Premium",
    options: [{ key: "lounge-1", name: "Accès salon — 1 passager", price: 600 }],
  },
  {
    id: "chauffeur",
    icon: Car,
    title: "Voiture avec chauffeur",
    desc: "Profitez d'un transfert privé vers ou depuis l'aéroport.",
    badge: "Service",
    options: [
      { key: "chauffeur-sedan", name: "Transfert aéroport — berline", price: 380 },
      { key: "chauffeur-suv", name: "Transfert aéroport — SUV", price: 520 },
    ],
  },
  {
    id: "insurance",
    icon: ShieldCheck,
    title: "Assurance voyage",
    desc: "Voyagez en toute tranquillité, où que vous alliez.",
    badge: "Recommandé",
    options: [
      { key: "ins-cancel", name: "Assurance annulation", price: 120 },
      { key: "ins-multi", name: "Assurance multirisque", price: 220 },
    ],
  },
];



const BOOKING = {
  pnr: "X7K9QP",
  status: "Confirmée",
  checkinOpen: true,
  passenger: "M. Ayoub ELAOUADI",
  skywardsNo: "SB 220 481 933",
  segments: [
    {
      id: 1,
      label: "Vol aller",
      date: "Mer. 24 juin 2026",
      flightNo: "EK 751",
      from: "Casablanca (CMN)",
      to: "Dubai (DXB)",
      departTime: "03:35",
      arriveTime: "13:25",
      terminal: "Terminal 3",
      gate: "—",
      duration: "7 h 50",
      aircraft: "Boeing 777-300ER",
      seat: "24K",
      checkedIn: false,
    },
    {
      id: 2,
      label: "Vol retour",
      date: "Mer. 1 juil. 2026",
      flightNo: "EK 752",
      from: "Dubai (DXB)",
      to: "Casablanca (CMN)",
      departTime: "09:35",
      arriveTime: "15:10",
      terminal: "Terminal 3",
      gate: "—",
      duration: "7 h 35",
      aircraft: "Airbus A380",
      seat: "Non attribué",
      checkedIn: false,
    },
  ],
};

const ACTIONS = [
  { icon: CheckCircle2, label: "Enregistrement en ligne", note: "Ouvert · 48h avant le départ" },
  { icon: Armchair, label: "Sélectionner un siège", note: "À partir de MAD 150" },
  { icon: Luggage, label: "Ajouter des bagages", note: "Bagages supplémentaires" },
  { icon: ArrowUpCircle, label: "Demande de surclassement", note: "Sous réserve de disponibilité" },
  { icon: Utensils, label: "Repas spéciaux", note: "Jusqu'à 24h avant le départ" },
  { icon: RefreshCcw, label: "Modifier la réservation", note: "Changement de date ou de vol" },
  { icon: Printer, label: "Carte d'embarquement", note: "Disponible après enregistrement" },
  { icon: AlertCircle, label: "Demande de remboursement", note: "Selon conditions tarifaires" },
];



export { NAV_ITEMS, SEARCH_TABS, QUICK_LINKS, DESTINATIONS, EXPERIENCE_CARDS, ABOUT_GRID, FOOTER_COLUMNS, CLASSES, TRIP, DATES, FLIGHTS, TIME_SLOTS, SORT_OPTIONS, fmt, PROMO_ITEMS, FLIGHT, SERVICE_CATEGORIES, BOOKING, ACTIONS };
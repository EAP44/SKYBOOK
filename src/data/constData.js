import {
  Car,
  Hotel,
  Compass,
  PlaneTakeoff,
  Users as UsersIcon,
} from "lucide-react";

const NAV_ITEMS = [
  "RÉSERVER",
  "GÉRER",
  "DÉCOUVRIR",
  "DESTINATIONS",
  "PROGRAMME DE FIDÉLITÉ",
  "AIDE",
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

export { NAV_ITEMS, SEARCH_TABS, QUICK_LINKS, DESTINATIONS, EXPERIENCE_CARDS, ABOUT_GRID, FOOTER_COLUMNS, CLASSES };

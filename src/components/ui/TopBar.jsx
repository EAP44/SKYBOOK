export default function TopBar() {
  return (
    <div className="hidden md:flex items-center justify-end gap-4 bg-[#1a1a1a] text-white text-xs px-6 py-1.5">
      <span className="opacity-80">MA · Français</span>
      <span className="opacity-40">|</span>
      <a href="#" className="opacity-80 hover:opacity-100">
        Se connecter
      </a>
    </div>
  );
}
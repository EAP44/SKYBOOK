export default function Hero() {
  return (
    <div className="relative">
      <div className="relative h-[360px] md:h-[460px] w-full overflow-hidden bg-[#231f20]">
        <img
          src="https://blog-cdn.athom.com/uploads/2025/05/creating-vacation-mode-flows-with-homey-hero-image.jpg"
          alt="Personnel de bord Emirates en Économie Premium"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />

        <div className="relative z-10 max-w-3xl mx-auto md:mx-0 md:ml-16 h-full flex flex-col justify-center px-6 md:px-0 text-white">
          <h1 className="text-2xl md:text-4xl font-bold leading-tight max-w-xl">
            Voyagez en toute flexibilité grâce à la{" "}
            <span className="text-[#001850]">
              MODIFICATION GRATUITE DES DATES
            </span>{" "}
            sur tous les nouveaux billets
          </h1>
          <button className="mt-6 w-fit bg-[#012169] hover:bg-[#1041b4] transition-colors text-white font-semibold text-sm px-6 py-3 tracking-wide">
            RÉSERVER DÈS MAINTENANT
          </button>
        </div>

        <img
          src="https://c.ekstatic.net/ecl/logos/emirates/emirates-fly-better-white.svg"
          alt="Voyagez mieux"
          className="hidden md:block absolute bottom-6 right-10 h-10 opacity-90"
        />
      </div>
    </div>
  );
}
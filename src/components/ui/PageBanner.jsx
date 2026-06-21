function PageBanner({ title, description }) {
  return (
    <div className="bg-[#231f20] text-white">
      <div className="max-w-6xl mx-auto px-4 py-9">
        <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>

        {description && (
          <p className="text-gray-300 text-sm mt-2 max-w-xl">{description}</p>
        )}
      </div>
    </div>
  );
}

export default PageBanner;

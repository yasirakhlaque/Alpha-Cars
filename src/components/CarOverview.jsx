function CarOverview({ details }) {
  return (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-xl border border-white/10 p-6 flex flex-col justify-center">
      <div className="mb-4">
        <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase shadow-lg">
          Available Now
        </span>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{details.model}</h1>
      <p className="text-gray-300 mb-6 flex items-center text-sm md:text-base">
        The future of electric performance is here.
      </p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
          <div className="text-xs text-gray-400 uppercase font-semibold">Year</div>
          <div className="text-lg font-medium text-white">{details.year}</div>
        </div>
        <div className="p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
          <div className="text-xs text-gray-400 uppercase font-semibold">Mileage</div>
          <div className="text-lg font-medium text-white">{details.mileage}</div>
        </div>
      </div>

      <div className="flex items-baseline space-x-1">
        <span className="text-2xl font-bold text-white">
          ${details.basePrice.toLocaleString()}
        </span>
        <span className="text-gray-400 text-sm">starting price</span>
      </div>
    </div>
  );
}

export default CarOverview;
function Navbar() {
  return (
    <nav className="bg-neutral-900/50 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40 shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <div className="w-8 h-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg flex items-center justify-center mr-3 shadow-lg">
              <span className="text-white font-bold">A</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              Auto<span className="text-white">Ex</span>
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button className="text-sm text-gray-300 hover:text-white transition-colors">
              Log in
            </button>
            <button className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg transition-all">
              Book Test Drive
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
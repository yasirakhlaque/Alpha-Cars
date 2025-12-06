import { useState } from 'react';
import { FaEye, FaInfoCircle } from 'react-icons/fa';
import Navbar from './components/Navbar';
import CarCarousel from './components/CarCarousel';
import CarOverview from './components/CarOverview';
import PriceCalculator from './components/PriceCalculator';
import ModelViewer360 from './components/ModelViewer360';
import { CAR_DETAILS } from './utils/constants';

export default function App() {
  const [is360Open, setIs360Open] = useState(false);
  const open360Viewer = () => setIs360Open(true);
  const close360Viewer = () => setIs360Open(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 font-sans text-white pb-20">
      <Navbar />
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            <CarCarousel />
            {/* 360° Button with gradient */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={open360Viewer}
                className="text-xs md:text-base col-span-2 group flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white p-4 rounded-2xl transition-all duration-300 font-bold shadow-lg hover:shadow-xl hover:scale-[1.02]"
              >
                <FaEye className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>View 360° Interactive Model</span>
              </button>
            </div>

            {/* Info Tip - Glassmorphism */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex items-start space-x-3 shadow-xl">
              <FaInfoCircle className="w-5 h-5 text-gray-300 shrink-0 mt-0.5" />
              <p className="text-xs md:text-sm text-gray-300">
                Tip: Click the 360° button above to explore the car in a 3D space.
                You can rotate, zoom, and inspect details.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <CarOverview details={CAR_DETAILS} />
            <PriceCalculator 
              basePrice={CAR_DETAILS.basePrice} 
              currency="INR" 
              locale="en-IN" 
            />

            {/* Confirm Button - Glassmorphism with gradient */}
            <button className="w-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] active:scale-95 text-sm md:text-base">
              Confirm Reservation
            </button>
          </div>

        </div>
      </main>

      <ModelViewer360
        isOpen={is360Open}
        onClose={close360Viewer}
      />
    </div>
  );
}
import { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { CAR_IMAGES } from '../utils/constants';
function CarCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const updateWidth = () => setWidth(element.offsetWidth);

    updateWidth();

    // Watch for size changes
    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(element);

    // Cleanup when component unmounts
    return () => resizeObserver.disconnect();
  }, []);

  // Enable keyboard navigation (left/right arrows)
  useEffect(() => {
    function handleKeyPress(e) {
      if (e.key === "ArrowLeft") {
        goToPrevious();
      }
      if (e.key === "ArrowRight") {
        goToNext();
      }
    }

    window.addEventListener("keydown", handleKeyPress);

    // Cleanup
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [activeIndex]); 

  // Update active index when user scrolls manually
  const handleScroll = () => {
    const element = scrollRef.current;
    if (!element || width === 0) return;

    // Calculate which image is currently in view
    const index = Math.round(element.scrollLeft / width);
    setActiveIndex(index);
  };

  // Navigate to a specific image
  const goToImage = (index) => {
    const element = scrollRef.current;
    if (!element) return;

    // Scroll to the image
    element.scrollTo({
      left: index * width,
      behavior: "smooth"
    });
    setActiveIndex(index);
  };

  // Go to previous image
  const goToPrevious = () => {
    const newIndex = Math.max(0, activeIndex - 1);
    goToImage(newIndex);
  };

  // Go to next image
  const goToNext = () => {
    const newIndex = Math.min(CAR_IMAGES.length - 1, activeIndex + 1);
    goToImage(newIndex);
  };

  return (
    <div className="relative group rounded-2xl overflow-hidden shadow-lg aspect-video bg-gray-900">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{ scrollBehavior: "smooth" }}
        role="region"
        aria-label="Car image gallery"
      >
        {CAR_IMAGES.map((imageSrc, index) => (
          <div
            key={index}
            className="w-full shrink-0 snap-center h-full relative"
            style={{ minWidth: "100%" }}
          >
            <img
              src={imageSrc}
              alt={`Car view ${index + 1}`}
              className="w-full h-full object-cover"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        ))}
      </div>

      <button
        onClick={goToPrevious}
        disabled={activeIndex === 0}
        aria-label="Previous image"
        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/45 disabled:opacity-30 transition"
      >
        <FaChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={goToNext}
        disabled={activeIndex === CAR_IMAGES.length - 1}
        aria-label="Next image"
        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/45 disabled:opacity-30 transition"
      >
        <FaChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {CAR_IMAGES.map((_, index) => (
          <button
            key={index}
            aria-label={`Go to image ${index + 1}`}
            onClick={() => goToImage(index)}
            className={`rounded-full transition-all ${index === activeIndex
                ? "w-6 h-2 bg-white rounded-md"
                : "w-2 h-2 bg-white/60"
              }`}
          />
        ))}
      </div>
    </div>
  );
}

export default CarCarousel;
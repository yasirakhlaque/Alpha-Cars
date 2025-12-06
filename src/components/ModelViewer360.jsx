import { useState, useEffect, useRef, createElement } from 'react';
import { IoClose } from 'react-icons/io5';

function ModelViewer360({ isOpen, onClose, modelUrl = "https://modelviewer.dev/shared-assets/models/Astronaut.glb" }) {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);

  const modalRef = useRef(null);
  useEffect(() => {
    if (!isOpen) return;

    const existingScript = document.querySelector("#model-viewer-script");

    if (existingScript) {
      setScriptLoaded(true);
    } else {
      const script = document.createElement("script");
      script.id = "model-viewer-script";
      script.type = "module";
      script.src = "https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js";

      script.onload = () => {
        setScriptLoaded(true);
        setTimeout(() => setModelLoaded(true), 1000);
      };

      script.onerror = () => setScriptLoaded(false);

      document.body.appendChild(script);
    }

    function handleEscapeKey(e) {
      if (e.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleEscapeKey);

    return () => window.removeEventListener("keydown", handleEscapeKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setModelLoaded(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="360 view modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-2xl w-full max-w-4xl h-[80vh] relative overflow-hidden"
      >
        <div className="absolute top-3 right-3 z-20">
          <button
            onClick={onClose}
            aria-label="Close 360 view"
            className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
          >
            <IoClose className="w-6 h-6 text-gray-800" />
          </button>
        </div>

        <div className="w-full h-full flex flex-col">
          <div className="flex-1 w-full h-full bg-gray-50 flex items-center justify-center">
            {!scriptLoaded && (
              <div className="text-center text-gray-500">
                Loading 3D viewer...
              </div>
            )}

            {scriptLoaded && (
              <div className="w-full h-full">
                {createElement('model-viewer', {
                  src: modelUrl,
                  alt: '3D model',
                  ar: true,
                  'auto-rotate': true,
                  'camera-controls': true,
                  style: { width: '100%', height: '100%' },
                  children: createElement('div', {
                    slot: 'poster',
                    className: 'flex items-center justify-center w-full h-full text-gray-400',
                    children: 'Loading 3D Model...'
                  })
                })}
              </div>
            )}
          </div>

          <div className="p-3 bg-white border-t text-sm text-gray-600 flex items-center justify-between">
            <div>
              {modelLoaded
                ? "Interact: drag to rotate • pinch to zoom"
                : "Model loading…"}
            </div>
            <div className="text-xs text-gray-400">Tip: Use mouse or touch</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModelViewer360;
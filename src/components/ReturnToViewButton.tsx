import { useMap } from 'react-leaflet';
import { Home } from 'lucide-react';

export default function ReturnToViewButton() {
  const map = useMap();

  const handleReturn = () => {
    map.setView([39.5, -8.0], 7);
  };

  return (
    <div className="leaflet-control-return leaflet-bar leaflet-control">
      <button
        onClick={handleReturn}
        className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-lg shadow-md flex items-center 
          justify-center hover:bg-gray-50 focus:outline-none focus:ring-2 
          focus:ring-blue-500 transition-colors"
        title="Return to Initial View"
      >
        <Home className="text-gray-600" size={18} />
      </button>
    </div>
  );
}
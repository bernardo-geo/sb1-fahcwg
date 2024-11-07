import { POI } from '../types/poi';
import { ExternalLink, MapPin } from 'lucide-react';
import { routeGroups, routeColors } from '../data/routes';

interface POIPopupProps {
  poi: POI;
  iconUrl: string;
}

export default function POIPopup({ poi, iconUrl }: POIPopupProps) {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${poi.coordinates[0]},${poi.coordinates[1]}`;

  const routeInfo = poi.routeIds?.map(routeId => {
    const group = routeGroups.find(g => g.routes.some(r => r.id === routeId));
    const route = group?.routes.find(r => r.id === routeId);
    return {
      groupId: group?.id || '',
      groupName: group?.name || '',
      routeName: route?.subCategory || '',
      color: group ? routeColors[group.id] : '',
      url: `https://visitportugal.com/en/experience/${route?.subCategory.toLowerCase().replace(/\s+/g, '-')}`
    };
  });

  return (
    <div className="w-[280px] sm:w-[320px] overflow-hidden">
      <img
        src={poi.image}
        alt={poi.name}
        className="w-full h-40 sm:h-48 object-cover"
      />
      <div className="p-3 sm:p-4">
        <div className="flex items-center gap-2 mb-2">
          <img 
            src={iconUrl}
            alt={poi.category}
            className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
          />
          <span className="text-xs sm:text-sm font-medium capitalize text-blue-600">
            {poi.category}
          </span>
        </div>
        <h3 className="font-bold text-base sm:text-lg mb-2 text-gray-900">
          {poi.name}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
          {poi.description}
        </p>
        
        {routeInfo && routeInfo.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Part of Routes:</h4>
            <div className="space-y-2">
              {routeInfo.map((info, index) => (
                <div 
                  key={index}
                  className="flex flex-col gap-1 p-2 rounded-lg bg-gray-50"
                >
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: info.color }}
                    />
                    <div className="flex-1">
                      <div className="text-xs font-medium text-gray-700">{info.groupName}</div>
                      <div className="text-xs text-gray-500">{info.routeName}</div>
                    </div>
                  </div>
                  <a
                    href={info.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:text-blue-800 transition-colors mt-1 inline-flex items-center gap-1"
                  >
                    View Route Details
                    <ExternalLink size={12} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <a
            href={poi.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            Visit Website
            <ExternalLink size={14} />
          </a>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-green-600 hover:text-green-800 transition-colors"
          >
            Open in Google Maps
            <MapPin size={14} />
          </a>
          {poi.hasMoedaId && (
            <a
              href="https://exploreid.pt/moeda-id/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-amber-600 hover:text-amber-800 transition-colors mt-2 bg-amber-50 px-3 py-2 rounded-lg"
            >
              <img src="/icons/coin.png" alt="Moeda ID" className="w-4 h-4" />
              Obtém aqui 10% de desconto com a Moeda ID
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
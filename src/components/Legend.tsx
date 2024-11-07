import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { POICategory } from '../types/poi';
import { routeGroups, routeColors } from '../data/routes';
import { categories } from '../config/categories';

interface LegendProps {
  categoryIcons: Record<POICategory, string>;
  selectedCategories: Set<POICategory>;
  toggleCategory: (category: POICategory) => void;
  selectedRoutes: Set<string>;
  toggleRoute: (routeId: string) => void;
  handleReset: () => void;
  baseMaps: Record<string, { url: string; attribution: string }>;
  selectedBaseMap: string;
  setSelectedBaseMap: (baseMap: string) => void;
  clearPOIs: () => void;
  clearRoutes: () => void;
  showMoedaId: boolean;
  setShowMoedaId: (show: boolean) => void;
}

interface CategoryGroupState {
  attractions: boolean;
  services: boolean;
  places: boolean;
  nature: boolean;
  routes: boolean;
}

export default function Legend({
  selectedCategories,
  toggleCategory,
  selectedRoutes,
  toggleRoute,
  handleReset,
  baseMaps,
  selectedBaseMap,
  setSelectedBaseMap,
  clearPOIs,
  clearRoutes,
  showMoedaId,
  setShowMoedaId
}: LegendProps) {
  const [expandedGroups, setExpandedGroups] = useState<CategoryGroupState>({
    attractions: true,
    services: true,
    places: true,
    nature: true,
    routes: true
  });

  const [expandedRouteGroups, setExpandedRouteGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (group: keyof CategoryGroupState) => {
    setExpandedGroups(prev => ({
      ...prev,
      [group]: !prev[group]
    }));
  };

  const toggleRouteGroup = (groupId: string) => {
    setExpandedRouteGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  const categoryGroups = {
    attractions: categories.filter(cat => cat.group === 'attractions'),
    services: categories.filter(cat => cat.group === 'services'),
    places: categories.filter(cat => cat.group === 'places'),
    nature: categories.filter(cat => cat.group === 'nature')
  };

  const renderCategoryGroup = (
    title: string,
    categoryGroup: typeof categories,
    groupKey: keyof CategoryGroupState
  ) => (
    <div key={`group-${groupKey}`} className="mb-3">
      <div className="flex items-center justify-between">
        <button
          onClick={() => toggleGroup(groupKey)}
          className="flex items-center gap-2 p-2.5 w-full bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <span className="font-medium text-sm text-gray-700">{title}</span>
          {expandedGroups[groupKey] ? (
            <ChevronDown size={16} className="text-gray-500 ml-auto" />
          ) : (
            <ChevronRight size={16} className="text-gray-500 ml-auto" />
          )}
        </button>
      </div>
      {expandedGroups[groupKey] && (
        <div className="mt-2 space-y-1 pl-1.5">
          {categoryGroup.map(category => (
            <div
              key={`category-${category.id}`}
              onClick={() => toggleCategory(category.id)}
              className={`
                flex items-center gap-2 p-2.5 rounded-lg cursor-pointer transition-all
                ${selectedCategories.has(category.id)
                  ? 'bg-blue-50 text-blue-700 shadow-sm'
                  : 'hover:bg-gray-50 text-gray-600'}
              `}
            >
              <img src={category.icon} alt={category.name} className="w-4 h-4" />
              <span className="text-sm font-medium">{category.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-4 p-3 sm:p-4">
      {/* Moeda ID Filter */}
      <div className="mb-4">
        <button
          onClick={() => setShowMoedaId(!showMoedaId)}
          className={`
            w-full flex items-center gap-2 p-3 rounded-lg transition-all text-sm
            ${showMoedaId 
              ? 'bg-amber-50 text-amber-700 shadow-sm' 
              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}
          `}
        >
          <img 
            src="/icons/coin.png" 
            alt="Moeda ID" 
            className="w-5 h-5 object-contain"
          />
          <span className="font-medium">Vê onde utilizar a Moeda ID</span>
        </button>
      </div>

      {/* Base Maps */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2 px-1">Base Map</h4>
        <div className="space-y-1.5">
          {Object.entries(baseMaps).map(([key, _]) => (
            <button
              key={`basemap-${key}`}
              onClick={() => setSelectedBaseMap(key)}
              className={`
                w-full px-3 py-2.5 text-sm rounded-lg transition-all
                ${selectedBaseMap === key
                  ? 'bg-blue-50 text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50'}
              `}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1 mb-2">
          <h4 className="text-sm font-medium text-gray-700">Categories</h4>
          <div className="flex items-center gap-2">
            {selectedCategories.size > 0 && (
              <button
                onClick={clearPOIs}
                className="text-xs font-medium text-red-500 hover:text-red-700 transition-colors"
              >
                Clear Categories
              </button>
            )}
            <button
              onClick={handleReset}
              className="text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors"
            >
              Reset All
            </button>
          </div>
        </div>
        {renderCategoryGroup('Attractions', categoryGroups.attractions, 'attractions')}
        {renderCategoryGroup('Services', categoryGroups.services, 'services')}
        {renderCategoryGroup('Places', categoryGroups.places, 'places')}
        {renderCategoryGroup('Nature', categoryGroups.nature, 'nature')}
      </div>

      {/* Routes */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1 mb-2">
          <h4 className="text-sm font-medium text-gray-700">Routes</h4>
          {selectedRoutes.size > 0 && (
            <button
              onClick={clearRoutes}
              className="text-xs font-medium text-red-500 hover:text-red-700 transition-colors"
            >
              Clear Routes
            </button>
          )}
        </div>
        {routeGroups.map(group => (
          <div key={`route-group-${group.id}`} className="space-y-1">
            <button
              onClick={() => toggleRouteGroup(group.id)}
              className="flex items-center gap-2 w-full p-2.5 text-sm bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div 
                className="w-2.5 h-2.5 rounded-full" 
                style={{ backgroundColor: routeColors[group.id] }}
              />
              <span className="text-gray-700 font-medium">{group.name}</span>
              {expandedRouteGroups[group.id] ? (
                <ChevronDown size={16} className="text-gray-500 ml-auto" />
              ) : (
                <ChevronRight size={16} className="text-gray-500 ml-auto" />
              )}
            </button>
            {expandedRouteGroups[group.id] && (
              <div className="pl-1.5 space-y-1">
                {group.routes.map(route => (
                  <div
                    key={`route-${route.id}`}
                    onClick={() => toggleRoute(route.id)}
                    className={`
                      flex items-center gap-2 p-2.5 rounded-lg cursor-pointer transition-all
                      ${selectedRoutes.has(route.id)
                        ? 'bg-blue-50 text-blue-700 shadow-sm'
                        : 'hover:bg-gray-50 text-gray-600'}
                    `}
                  >
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: routeColors[group.id] }}
                    />
                    <span className="text-sm font-medium">{route.subCategory}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
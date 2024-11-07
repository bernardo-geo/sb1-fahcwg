import { useState, useCallback, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, Tooltip } from 'react-leaflet';
import * as L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import { POI, POICategory } from '../types/poi';
import { pois } from '../data/pois';
import { routeGroups } from '../data/routes';
import { categoryIcons } from '../utils/icons';
import { baseMaps } from '../types/map';
import SearchBar from './SearchBar';
import Legend from './Legend';
import POIPopup from './POIPopup';
import FullscreenControl from './FullscreenControl';
import ReturnToViewButton from './ReturnToViewButton';

export default function Map() {
  const [selectedCategories, setSelectedCategories] = useState<Set<POICategory>>(
    new Set(Object.keys(categoryIcons) as POICategory[])
  );
  const [previousCategories, setPreviousCategories] = useState<Set<POICategory>>(
    new Set(Object.keys(categoryIcons) as POICategory[])
  );
  const [selectedRoutes, setSelectedRoutes] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [showMoedaId, setShowMoedaId] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedBaseMap, setSelectedBaseMap] = useState<keyof typeof baseMaps>('standard');
  const mapRef = useRef<L.Map | null>(null);

  const updateCategoriesFromRoutes = useCallback((routes: Set<string>) => {
    if (routes.size > 0) {
      const routePOIs = pois.filter(poi => 
        poi.routeIds?.some(routeId => routes.has(routeId))
      );

      const categories = new Set<POICategory>(
        routePOIs.map(poi => poi.category)
      );

      setPreviousCategories(selectedCategories);
      setSelectedCategories(categories);
    } else {
      setSelectedCategories(previousCategories);
    }
  }, [selectedCategories, previousCategories]);

  const updateCategoriesFromMoedaId = useCallback((show: boolean) => {
    if (show) {
      const moedaIdPOIs = pois.filter(poi => poi.hasMoedaId);
      const categories = new Set<POICategory>(
        moedaIdPOIs.map(poi => poi.category)
      );
      setPreviousCategories(selectedCategories);
      setSelectedCategories(categories);
    } else {
      // When deselecting Moeda ID, restore all categories
      setSelectedCategories(new Set(Object.keys(categoryIcons) as POICategory[]));
    }
  }, [selectedCategories]);

  const toggleRoute = useCallback((routeId: string) => {
    setSelectedRoutes(prev => {
      const newRoutes = new Set(prev);
      if (newRoutes.has(routeId)) {
        newRoutes.delete(routeId);
      } else {
        newRoutes.add(routeId);
        const routePOIs = pois.filter(poi => poi.routeIds?.includes(routeId));
        if (mapRef.current && routePOIs.length > 0) {
          const bounds = L.latLngBounds(routePOIs.map(poi => poi.coordinates));
          mapRef.current.fitBounds(bounds, { padding: [50, 50] });
        }
      }
      updateCategoriesFromRoutes(newRoutes);
      return newRoutes;
    });
  }, [updateCategoriesFromRoutes]);

  const toggleCategory = useCallback((category: POICategory) => {
    setSelectedCategories(prev => {
      const newCategories = new Set(prev);
      if (newCategories.has(category)) {
        newCategories.delete(category);
      } else {
        newCategories.add(category);
      }
      setPreviousCategories(newCategories);
      return newCategories;
    });
  }, []);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const searchLower = searchQuery.toLowerCase();
    
    const poi = pois.find(p => 
      p.name.toLowerCase().includes(searchLower) ||
      p.description.toLowerCase().includes(searchLower)
    );

    const routeMatch = routeGroups.flatMap(group => 
      group.routes.filter(route => 
        route.subCategory.toLowerCase().includes(searchLower)
      )
    )[0];

    if (poi && mapRef.current) {
      mapRef.current.setView(poi.coordinates, 15);
      setIsSidebarOpen(false);
    } else if (routeMatch && mapRef.current) {
      const routePOIs = pois.filter(p => p.routeIds?.includes(routeMatch.id));
      if (routePOIs.length > 0) {
        const bounds = L.latLngBounds(routePOIs.map(p => p.coordinates));
        mapRef.current.fitBounds(bounds);
        setSelectedRoutes(new Set([routeMatch.id]));
        setIsSidebarOpen(false);
      }
    }
  }, [searchQuery]);

  const selectAllCategories = useCallback(() => {
    const allCategories = new Set(Object.keys(categoryIcons) as POICategory[]);
    setSelectedCategories(allCategories);
    setPreviousCategories(allCategories);
    setSelectedRoutes(new Set());
    setShowMoedaId(false);
    setSearchQuery('');
    if (mapRef.current) {
      mapRef.current.setView([40.2056, -8.4196], 15);
    }
  }, []);

  const clearPOIs = useCallback(() => {
    setSelectedCategories(new Set());
    setPreviousCategories(new Set());
  }, []);

  const clearRoutes = useCallback(() => {
    setSelectedRoutes(new Set());
    setSelectedCategories(previousCategories);
  }, [previousCategories]);

  const handleMoedaIdToggle = useCallback((show: boolean) => {
    setShowMoedaId(show);
    updateCategoriesFromMoedaId(show);
  }, [updateCategoriesFromMoedaId]);

  const filteredPOIs = pois.filter(poi => {
    const matchesCategory = selectedCategories.has(poi.category);
    const matchesMoedaId = !showMoedaId || (showMoedaId && poi.hasMoedaId);
    const matchesRoute = selectedRoutes.size === 0 || 
      (poi.routeIds && poi.routeIds.some(id => selectedRoutes.has(id)));
    const matchesSearch = searchQuery === '' || 
      poi.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      poi.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesMoedaId && matchesRoute && matchesSearch;
  });

  return (
    <div id="app-container" className="flex h-screen w-screen overflow-hidden">
      <div
        className={`
          fixed w-[240px] sm:w-[280px] h-full bg-white shadow-xl z-[1000]
          transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="h-full overflow-y-auto">
          <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">Map Controls</h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Hide sidebar"
            >
              <PanelLeftClose className="text-gray-600" size={20} />
            </button>
          </div>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
            handleReset={selectAllCategories}
          />
          <Legend
            categoryIcons={Object.fromEntries(
              Object.entries(categoryIcons).map(([key, icon]) => [
                key,
                icon.options.iconUrl || ''
              ])
            )}
            selectedCategories={selectedCategories}
            toggleCategory={toggleCategory}
            selectedRoutes={selectedRoutes}
            toggleRoute={toggleRoute}
            handleReset={selectAllCategories}
            baseMaps={baseMaps}
            selectedBaseMap={selectedBaseMap}
            setSelectedBaseMap={setSelectedBaseMap}
            clearPOIs={clearPOIs}
            clearRoutes={clearRoutes}
            showMoedaId={showMoedaId}
            setShowMoedaId={handleMoedaIdToggle}
          />
        </div>
      </div>

      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed top-3 left-3 z-[1001] bg-white p-2 rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
          aria-label="Show sidebar"
        >
          <PanelLeftOpen className="text-gray-600" size={20} />
        </button>
      )}

      <div className={`relative flex-1 h-full transition-all duration-300 ${isSidebarOpen ? 'ml-[240px] sm:ml-[280px]' : 'ml-0'}`}>
        <MapContainer
          center={[40.2056, -8.4196]}
          zoom={15}
          className="h-full w-full"
          ref={mapRef}
          zoomControl={false}
        >
          <TileLayer
            url={baseMaps[selectedBaseMap].url}
            attribution={baseMaps[selectedBaseMap].attribution}
            maxZoom={19}
          />
          <ZoomControl position="bottomright" />
          <FullscreenControl />
          <ReturnToViewButton />
          
          <MarkerClusterGroup
            chunkedLoading
            maxClusterRadius={40}
            spiderfyOnMaxZoom={true}
            showCoverageOnHover={false}
          >
            {filteredPOIs.map((poi) => (
              <Marker
                key={poi.id}
                position={poi.coordinates}
                icon={categoryIcons[poi.category]}
              >
                <Popup className="custom-popup">
                  <POIPopup 
                    poi={poi} 
                    iconUrl={categoryIcons[poi.category].options.iconUrl || ''} 
                  />
                </Popup>
                <Tooltip 
                  direction="top" 
                  offset={[0, -20]} 
                  opacity={1}
                  permanent={mapRef.current?.getZoom() && mapRef.current.getZoom() > 12}
                >
                  {poi.name}
                </Tooltip>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
    </div>
  );
}
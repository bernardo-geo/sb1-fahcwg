export type POICategory = 'museum' | 'castle' | 'restaurant' | 'park' | 'monument' | 'locality' | 'beach';

export interface POI {
  id: string;
  name: string;
  description: string;
  url: string;
  category: POICategory;
  image: string;
  coordinates: [number, number];
  googleMapsUrl?: string;
  hasMoedaId?: boolean;
  routeIds?: string[];
}

export interface Route {
  id: string;
  subCategory: string;
}

export interface RouteGroup {
  id: string;
  name: string;
  routes: Route[];
}
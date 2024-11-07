import { POICategory } from '../types/poi';

export interface CategoryConfig {
  id: POICategory;
  name: string;
  description: string;
  icon: string;
  group: 'attractions' | 'services' | 'places' | 'nature';
}

export const categories: CategoryConfig[] = [
  {
    id: 'monument',
    name: 'Monument',
    description: 'Historical monuments and landmarks',
    icon: '/icons/monument.png',
    group: 'attractions'
  },
  {
    id: 'castle',
    name: 'Castle',
    description: 'Medieval castles and fortifications',
    icon: '/icons/castle.png',
    group: 'attractions'
  },
  {
    id: 'restaurant',
    name: 'Restaurant',
    description: 'Dining establishments',
    icon: '/icons/restaurant.png',
    group: 'services'
  },
  {
    id: 'museum',
    name: 'Museum',
    description: 'Cultural and historical museums',
    icon: '/icons/museum.png',
    group: 'services'
  },
  {
    id: 'park',
    name: 'Park',
    description: 'Natural parks and gardens',
    icon: '/icons/park.png',
    group: 'places'
  },
  {
    id: 'locality',
    name: 'Locality',
    description: 'Cities and towns',
    icon: '/icons/locality.png',
    group: 'places'
  },
  {
    id: 'beach',
    name: 'Beach',
    description: 'Coastal beaches and waterfronts',
    icon: '/icons/beach.png',
    group: 'nature'
  }
];
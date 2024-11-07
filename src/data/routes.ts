import { RouteGroup } from '../types/poi';

export const routeColors: Record<string, string> = {
  'wine-routes': '#D946EF', // Vibrant purple for wine routes
  'roman-routes': '#EA580C', // Burnt orange for roman routes
  'medieval-routes': '#854D0E', // Brown for medieval routes
  'nature-routes': '#16A34A'  // Green for nature routes
};

export const routeGroups: RouteGroup[] = [
  {
    id: 'wine-routes',
    name: 'Wine Routes',
    routes: [
      {
        id: 'wine-route-1',
        subCategory: 'Douro Valley Wine Route'
      },
      {
        id: 'wine-route-2',
        subCategory: 'Alentejo Wine Route'
      }
    ]
  },
  {
    id: 'roman-routes',
    name: 'Roman Routes',
    routes: [
      {
        id: 'roman-route-1',
        subCategory: 'Via Romana XVII'
      },
      {
        id: 'roman-route-2',
        subCategory: 'Via Romana XVI'
      }
    ]
  },
  {
    id: 'medieval-routes',
    name: 'Medieval Routes',
    routes: [
      {
        id: 'medieval-route-1',
        subCategory: 'Knights Templar Route'
      },
      {
        id: 'medieval-route-2',
        subCategory: 'Castles Route'
      }
    ]
  },
  {
    id: 'nature-routes',
    name: 'Nature Routes',
    routes: [
      {
        id: 'nature-route-1',
        subCategory: 'Serra da Estrela Trail'
      },
      {
        id: 'nature-route-2',
        subCategory: 'Peneda-Gerês Trail'
      }
    ]
  }
];
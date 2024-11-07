import { POI } from '../types/poi';

export const pois: POI[] = [
  {
    id: '1',
    name: 'Jerónimos Monastery',
    description: 'UNESCO World Heritage site and masterpiece of Manueline architecture in Lisbon',
    url: 'http://www.mosteirojeronimos.gov.pt/en/',
    category: 'monument',
    image: 'https://images.unsplash.com/photo-1589292147842-b42c64cc4b99?auto=format&fit=crop&w=800',
    coordinates: [38.6977, -9.2065],
    hasMoedaId: true,
    routeIds: ['medieval-route-2']
  },
  {
    id: '2',
    name: 'Belém Tower',
    description: 'Iconic fortified tower and UNESCO World Heritage site in Lisbon',
    url: 'http://www.torrebelem.gov.pt/en/',
    category: 'castle',
    image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=800',
    coordinates: [38.6916, -9.2157],
    hasMoedaId: true,
    routeIds: ['medieval-route-2']
  },
  {
    id: '3',
    name: 'Time Out Market Lisboa',
    description: 'Iconic food market featuring top Portuguese chefs and restaurants',
    url: 'https://www.timeoutmarket.com/lisboa/',
    category: 'restaurant',
    image: 'https://images.unsplash.com/photo-1555881400-891c0135a100?auto=format&fit=crop&w=800',
    coordinates: [38.707, -9.1466],
    routeIds: ['wine-route-2']
  },
  {
    id: '4',
    name: 'Serralves Museum',
    description: 'Contemporary art museum with beautiful gardens in Porto',
    url: 'https://www.serralves.pt/en/',
    category: 'museum',
    image: 'https://images.unsplash.com/photo-1574785289548-d0c5d446d7f9?auto=format&fit=crop&w=800',
    coordinates: [41.1591, -8.6593],
    hasMoedaId: true,
    routeIds: ['nature-route-2']
  },
  {
    id: '5',
    name: 'Miradouro de Santa Catarina',
    description: 'Scenic viewpoint overlooking the Tagus River',
    url: 'https://www.visitlisboa.com/en/places/miradouro-de-santa-catarina',
    category: 'park',
    image: 'https://images.unsplash.com/photo-1578912996078-305d92249aa6?auto=format&fit=crop&w=800',
    coordinates: [38.7633, -9.095],
    routeIds: ['nature-route-1']
  },
  {
    id: '6',
    name: 'University of Coimbra',
    description: 'Historic university and UNESCO World Heritage site with stunning baroque library',
    url: 'https://www.uc.pt/en/informacaopara/visit',
    category: 'monument',
    image: 'https://images.unsplash.com/photo-1604935157233-e7fe1339d1b2?auto=format&fit=crop&w=800',
    coordinates: [40.208, -8.4269],
    hasMoedaId: true,
    routeIds: ['roman-route-2']
  },
  {
    id: '7',
    name: 'Sé Velha de Coimbra',
    description: 'Romanesque Roman Catholic cathedral dating from the 12th century',
    url: 'https://www.visitportugal.com/en/content/se-velha-coimbra',
    category: 'monument',
    image: 'https://images.unsplash.com/photo-1592510819611-648c11d0d949?auto=format&fit=crop&w=800',
    coordinates: [40.2089, -8.4275],
    routeIds: ['medieval-route-1']
  },
  {
    id: '8',
    name: 'Monastery of Santa Clara-a-Velha',
    description: 'Gothic monastery with unique architecture and riverside location',
    url: 'http://mosteirosantaclara-a-velha.drcc.pt/',
    category: 'monument',
    image: 'https://images.unsplash.com/photo-1594843863977-3e0920dc2c0c?auto=format&fit=crop&w=800',
    coordinates: [40.2022, -8.4319],
    routeIds: ['medieval-route-1']
  },
  {
    id: '16',
    name: 'Penela Castle',
    description: 'Medieval castle with stunning views of the Serra da Lousã',
    url: 'https://www.visitportugal.com/en/content/castelo-de-penela',
    category: 'castle',
    image: 'https://images.unsplash.com/photo-1573146500785-c84e60484d8d?auto=format&fit=crop&w=800',
    coordinates: [40.0307, -8.3889],
    routeIds: ['medieval-route-1']
  },
  {
    id: '17',
    name: 'São João do Deserto Viewpoint',
    description: 'Panoramic viewpoint offering breathtaking views of the surrounding valleys',
    url: 'https://www.cm-penela.pt/turismo/pontos-de-interesse/',
    category: 'park',
    image: 'https://images.unsplash.com/photo-1592853625597-7d17be820d0c?auto=format&fit=crop&w=800',
    coordinates: [40.0257, -8.3814],
    routeIds: ['nature-route-1']
  },
  {
    id: '18',
    name: 'Pombal Castle',
    description: 'Impressive 12th-century castle built by the Knights Templar',
    url: 'https://www.visitportugal.com/en/content/castelo-de-pombal',
    category: 'castle',
    image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=800',
    coordinates: [39.9158, -8.6278],
    hasMoedaId: true,
    routeIds: ['medieval-route-1']
  },
  {
    id: '19',
    name: 'Mata Nacional do Urso',
    description: 'Protected pine forest area with walking trails and unique coastal ecosystem',
    url: 'https://www.cm-pombal.pt/viver/ambiente/mata-nacional-do-urso/',
    category: 'park',
    image: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=800',
    coordinates: [40.0289, -8.8961],
    hasMoedaId: true,
    routeIds: ['nature-route-2']
  },
  {
    id: '20',
    name: 'Villa Romana do Rabaçal',
    description: 'Well-preserved Roman villa with beautiful mosaics and archaeological museum',
    url: 'https://www.cm-penela.pt/turismo/villa-romana-do-rabacal/',
    category: 'museum',
    image: 'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&w=800',
    coordinates: [40.0319, -8.4447],
    hasMoedaId: true,
    routeIds: ['roman-route-1']
  },
  {
    id: '21',
    name: 'Serra do Espinhal',
    description: 'Mountain range offering hiking trails and natural pools',
    url: 'https://www.cm-penela.pt/turismo/serra-do-espinhal/',
    category: 'park',
    image: 'https://images.unsplash.com/photo-1592853625612-d5c0e8e7d0d9?auto=format&fit=crop&w=800',
    coordinates: [40.0167, -8.3500],
    routeIds: ['nature-route-1']
  },
  {
    id: '22',
    name: 'Restaurante O Manjar do Marquês',
    description: 'Traditional Portuguese restaurant known for regional cuisine and local wines',
    url: 'https://www.cm-pombal.pt/viver/gastronomia/',
    category: 'restaurant',
    image: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&w=800',
    coordinates: [39.9147, -8.6289],
    hasMoedaId: true,
    routeIds: ['wine-route-1']
  },
  {
    id: '23',
    name: 'Casa do Tempo - Penela',
    description: 'Cultural center and museum showcasing local history and traditions',
    url: 'https://www.cm-penela.pt/turismo/casa-do-tempo/',
    category: 'museum',
    image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=800',
    coordinates: [40.0297, -8.3883],
    hasMoedaId: true,
    routeIds: ['roman-route-2']
  },
  {
    id: '24',
    name: 'Convento do Cardal',
    description: 'Historic 17th-century convent with beautiful baroque architecture',
    url: 'https://www.cm-pombal.pt/viver/cultura/convento-do-cardal/',
    category: 'monument',
    image: 'https://images.unsplash.com/photo-1548743491-0ea4ed8f2d39?auto=format&fit=crop&w=800',
    coordinates: [39.9156, -8.6289],
    hasMoedaId: true,
    routeIds: ['medieval-route-2']
  }
];
export interface BusinessSectorData {
  id: string;
  name: string;
  icon: string;
  description: string;
  avgConsumptionKwh: number;
}

export const BUSINESS_SECTORS: BusinessSectorData[] = [
  { id: 'manufactura', name: 'Manufactura', icon: '🏭', description: 'Fábricas, talleres industriales', avgConsumptionKwh: 25000 },
  { id: 'alimentos', name: 'Alimentos', icon: '🍞', description: 'Panaderías, frigoríficos, lácteos', avgConsumptionKwh: 18000 },
  { id: 'logistica', name: 'Logística', icon: '📦', description: 'Galpones, centros de distribución', avgConsumptionKwh: 12000 },
  { id: 'metalurgia', name: 'Metalurgia', icon: '🔩', description: 'Soldadura, fundición, estructuras', avgConsumptionKwh: 35000 },
  { id: 'comercio', name: 'Comercio', icon: '🏪', description: 'Tiendas mayoristas, supermercados', avgConsumptionKwh: 8000 },
  { id: 'salud', name: 'Salud', icon: '🏥', description: 'Clínicas, hospitales, laboratorios', avgConsumptionKwh: 15000 },
  { id: 'agroindustria', name: 'Agroindustria', icon: '🌾', description: 'Silos, secadores, riego', avgConsumptionKwh: 22000 },
  { id: 'taller', name: 'Taller', icon: '🔧', description: 'Mecánica, carpintería, servicios', avgConsumptionKwh: 5000 },
  { id: 'textil', name: 'Textil', icon: '🧵', description: 'Confecciones, telares, lavanderías', avgConsumptionKwh: 16000 },
  { id: 'hoteleria', name: 'Hotelería', icon: '🏨', description: 'Hoteles, hostales, restaurantes', avgConsumptionKwh: 10000 },
];

export interface SantaCruzZoneData {
  id: string;
  name: string;
  lat: number;
  lng: number;
  description: string;
}

export const SANTA_CRUZ_ZONES: SantaCruzZoneData[] = [
  { id: 'warnes', name: 'Warnes / PILAT', lat: -17.50, lng: -63.17, description: 'Parque Industrial Latinoamericano' },
  { id: 'cotoca', name: 'Cotoca', lat: -17.75, lng: -62.99, description: 'Cinturón industrial metropolitano' },
  { id: 'montero', name: 'Montero', lat: -17.34, lng: -63.26, description: 'Norte integrado metropolitano' },
  { id: 'centro', name: 'Centro (4to-7mo anillo)', lat: -17.78, lng: -63.18, description: 'Área urbana Santa Cruz' },
  { id: 'lguardia', name: 'La Guardia', lat: -17.88, lng: -63.33, description: 'Expansión sur metropolitana' },
  { id: 'zofracruz', name: 'ZOFRACRUZ / Aeropuerto', lat: -17.80, lng: -63.13, description: 'Zona franca y logística' },
];

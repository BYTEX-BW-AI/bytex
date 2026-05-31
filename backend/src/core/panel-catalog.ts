import { PanelOption } from './types.js';

export const PANEL_CATALOG: PanelOption[] = [
  {
    id: 'jinko-tiger-neo-670w',
    brand: 'Jinko',
    model: 'Tiger NEO III 78HC',
    technology: 'TOPCon',
    wattPeak: 670,
    efficiency: 24.8,
    dimensionsMm: '2465×1134×30',
    areaM2: 2.80,
    wattPerM2: 239,
    coeffTemp: -0.29,
    warrantyYears: 30,
    priceFob: 80.40,
    priceLanded: 108,
    pricePerWattLanded: 0.161,
  },
  {
    id: 'aiko-stellar-685w',
    brand: 'Aiko',
    model: 'Stellar 3N+72',
    technology: 'ABC',
    wattPeak: 685,
    efficiency: 25.4,
    dimensionsMm: '2382×1134×30',
    areaM2: 2.70,
    wattPerM2: 254,
    coeffTemp: -0.26,
    warrantyYears: 30,
    priceFob: 143.85,
    priceLanded: 195,
    pricePerWattLanded: 0.285,
  },
  {
    id: 'longi-himo-x10-670w',
    brand: 'LONGi',
    model: 'Hi-MO X10 Scientist 72c',
    technology: 'HPBC',
    wattPeak: 670,
    efficiency: 24.8,
    dimensionsMm: '2384×1134×30',
    areaM2: 2.70,
    wattPerM2: 248,
    coeffTemp: -0.28,
    warrantyYears: 30,
    priceFob: 100.50,
    priceLanded: 135,
    pricePerWattLanded: 0.201,
  },
  {
    id: 'recom-black-tiger-665w',
    brand: 'Recom',
    model: 'Black Tiger 665W',
    technology: 'BC',
    wattPeak: 665,
    efficiency: 24.8,
    dimensionsMm: '2384×1303×30',
    areaM2: 3.11,
    wattPerM2: 214,
    coeffTemp: -0.27,
    warrantyYears: 30,
    priceFob: 119.70,
    priceLanded: 161,
    pricePerWattLanded: 0.242,
  },
  {
    id: 'trina-vertex-475w',
    brand: 'Trina',
    model: 'Vertex S+ 54c',
    technology: 'TOPCon',
    wattPeak: 475,
    efficiency: 23.8,
    dimensionsMm: '1762×1134×30',
    areaM2: 2.00,
    wattPerM2: 238,
    coeffTemp: -0.30,
    warrantyYears: 30,
    priceFob: 52.25,
    priceLanded: 70,
    pricePerWattLanded: 0.148,
  },
  {
    id: 'perc-standard-450w',
    brand: 'PERC',
    model: 'Estándar 72c',
    technology: 'PERC',
    wattPeak: 450,
    efficiency: 20.0,
    dimensionsMm: '2094×1038×30',
    areaM2: 2.17,
    wattPerM2: 207,
    coeffTemp: -0.38,
    warrantyYears: 25,
    priceFob: 31.50,
    priceLanded: 48,
    pricePerWattLanded: 0.108,
  },
];

export class PanelSelectorService {
  getAll(): PanelOption[] {
    return PANEL_CATALOG;
  }

  getById(id: string): PanelOption | undefined {
    return PANEL_CATALOG.find(p => p.id === id);
  }

  recommendByBudget(spaceAvailable: 'limited' | 'ample', budget: 'low' | 'medium' | 'high'): PanelOption[] {
    let filtered = [...PANEL_CATALOG];

    if (spaceAvailable === 'limited') {
      filtered = filtered.filter(p => p.wattPerM2 >= 240).sort((a, b) => b.wattPerM2 - a.wattPerM2);
    }
    if (budget === 'low') {
      filtered = filtered.filter(p => p.pricePerWattLanded < 0.15).sort((a, b) => a.pricePerWattLanded - b.pricePerWattLanded);
    }
    if (budget === 'high') {
      filtered = filtered.sort((a, b) => b.efficiency - a.efficiency);
    }

    return filtered.slice(0, 4);
  }
}

export const panelSelector = new PanelSelectorService();

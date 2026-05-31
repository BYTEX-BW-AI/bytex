import { SimulationType, ExtractedBillData, PanelOption, SimulationResult, MicrogridSizing, FinancialResult, CostBreakdownItem, EnvironmentalImpact } from './simulation.model';

export interface SimulatorState {
  currentStep: number;
  simulationType: SimulationType | null;

  // Bill upload
  billFile: File | null;
  billImageBase64: string | null;

  // Gemini extraction
  extractingBill: boolean;
  billData: ExtractedBillData | null;
  extractionError: string | null;

  // Sector selection (new business)
  selectedSector: string | null;
  selectedZone: string | null;
  estimatedConsumption: number | null;

  // Solar data
  irradiance: number | null;
  location: { lat: number; lng: number } | null;
  solarDataLoading: boolean;
  solarDataError: string | null;

  // Panel selection
  availablePanels: PanelOption[];
  selectedPanel: PanelOption | null;

  // Calculation
  calculating: boolean;
  sizing: MicrogridSizing | null;
  financial: FinancialResult | null;
  costs: CostBreakdownItem[];
  environmental: EnvironmentalImpact | null;
  calculationError: string | null;

  // Result
  result: SimulationResult | null;
  saving: boolean;
  saved: boolean;
  saveError: string | null;
}

export const PANEL_PRESETS: PanelOption[] = [
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
    priceLandedScz: 108,
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
    priceLandedScz: 195,
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
    priceLandedScz: 135,
    pricePerWattLanded: 0.201,
  },
  {
    id: 'recom-black-tiger-665w',
    brand: 'Recom',
    model: 'Black Tiger 665W',
    technology: 'ABC',
    wattPeak: 665,
    efficiency: 24.8,
    dimensionsMm: '2384×1303×30',
    areaM2: 3.11,
    wattPerM2: 214,
    coeffTemp: -0.27,
    warrantyYears: 30,
    priceFob: 119.70,
    priceLandedScz: 161,
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
    priceLandedScz: 70,
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
    priceLandedScz: 48,
    pricePerWattLanded: 0.108,
  },
];

export const initialSimulatorState: SimulatorState = {
  currentStep: 1,
  simulationType: null,
  billFile: null,
  billImageBase64: null,
  extractingBill: false,
  billData: null,
  extractionError: null,
  selectedSector: null,
  selectedZone: null,
  estimatedConsumption: null,
  irradiance: null,
  location: null,
  solarDataLoading: false,
  solarDataError: null,
  availablePanels: PANEL_PRESETS,
  selectedPanel: PANEL_PRESETS[0],
  calculating: false,
  sizing: null,
  financial: null,
  costs: [],
  environmental: null,
  calculationError: null,
  result: null,
  saving: false,
  saved: false,
  saveError: null,
};

export type SimulationType = 'existing' | 'new';
export type SimulationStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface GeminiAnalysis {
  riskAssessment: 'ALTO' | 'MEDIO' | 'BAJO';
  recommendation: string;
  rationale: string;
  initialInsights: string[];
}

export interface ExtractedBillData {
  consumoKwh: number;
  potenciaMaximaKw: number;
  costoTotalBs: number;
  periodoFacturacion: string;
  nit: string;
  nombreCliente: string;
  tarifa: string;
  numeroFactura: string;
  cargoFijoBs: number;
  cargoVariableBs: number;
  otrosCargosBs: number;
}

export interface PanelOption {
  id: string;
  brand: string;
  model: string;
  technology: 'PERC' | 'TOPCon' | 'HJT' | 'ABC' | 'IBC' | 'HPBC';
  wattPeak: number;
  efficiency: number;
  dimensionsMm: string;
  areaM2: number;
  wattPerM2: number;
  coeffTemp: number;
  warrantyYears: number;
  priceFob: number;
  priceLandedScz: number;
  pricePerWattLanded: number;
}

export interface MicrogridSizing {
  panelCount: number;
  peakPowerKw: number;
  inverterCount: number;
  inverterPowerKw: number;
  batteryCount: number;
  batteryKwh: number;
  batteryModuleKwh: number;
  batteryModulePrice: number;
  mpptCount: number;
  mpptUnitKw: number;
  mpptUnitPrice: number;
  areaM2: number;
  dailyGenerationKwh: number;
  monthlyGenerationKwh: number;
}

export interface FinancialResult {
  totalCapEx: number;
  totalCapExPerWatt: number;
  paybackYears: number;
  discountedPaybackYears: number;
  irr: number;
  van: number;
  lcoe: number;
  co2AvoidedTons: number;
  twentyFiveYearSavings: number;
  yearlyBreakdown: YearlyBreakdown[];
}

export interface YearlyBreakdown {
  year: number;
  creCumulative: number;
  solarCumulative: number;
  savings: number;
  breakEven: boolean;
}

export interface CostBreakdownItem {
  label: string;
  quantity: number;
  unitPrice: number;
  total: number;
  note?: string;
}

export interface ExchangeRateInfo {
  rate: number;
  source: string;
  updatedAt: string | null;
}

export interface EnvironmentalImpact {
  co2AvoidedTons: number;
  treeEquivalent: number;
  waterSavedLiters: number;
}

export interface SimulationResult {
  id?: string;
  type: SimulationType;
  billData?: ExtractedBillData;
  sector?: string;
  zone?: string;
  irradiance: number;
  selectedPanel: PanelOption;
  sizing: MicrogridSizing;
  financial: FinancialResult;
  costs: CostBreakdownItem[];
  environmental: EnvironmentalImpact;
  exchangeRate: ExchangeRateInfo;
  scenarios?: ScenarioItem[];
  createdAt?: Date;
}

export interface ScenarioItem {
  label: string;
  creIncrease: number;
  totalCre25Years: number;
  totalOam25Years: number;
  saving25Years: number;
  paybackYears: number;
  irr: number;
}

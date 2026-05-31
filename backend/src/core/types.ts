export interface BatteryModule {
  kwh: number;
  priceUsd: number;
  model: string;
}

export interface SizingInput {
  monthlyConsumptionKwh: number;
  peakPowerKw: number | null;
  irradianceKwhM2Day: number;
  panelWattPeak: number;
  panelAreaM2: number;
  systemEfficiency: number;
}

export interface SizingResult {
  panelCount: number;
  peakPowerKw: number;
  inverterCount: number;
  inverterPowerKw: number;
  inverterUnitPrice: number;
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

export interface FinancialInput {
  totalCapEx: number;
  monthlyCreBill: number;
  creAnnualIncrease: number;
  discountRate: number;
  systemDegradation: number;
  annualOandM: number;
  dailyGenerationKwh: number;
  co2FactorKgPerKwh: number;
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

export interface PanelOption {
  id: string;
  brand: string;
  model: string;
  technology: string;
  wattPeak: number;
  efficiency: number;
  dimensionsMm: string;
  areaM2: number;
  wattPerM2: number;
  coeffTemp: number;
  warrantyYears: number;
  priceFob: number;
  priceLanded: number;
  pricePerWattLanded: number;
}

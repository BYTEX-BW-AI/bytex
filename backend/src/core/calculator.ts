import { microgridSizer } from './microgrid-sizer.service.js';
import { financialCalculator } from './financial-calculator.service.js';
import { panelSelector } from './panel-catalog.js';
import { getCachedRate } from './exchange-rate.service.js';
import { SizingInput, FinancialInput, SizingResult, FinancialResult, PanelOption, CostBreakdownItem } from './types.js';

export interface CalculateRequest {
  monthlyConsumptionKwh: number;
  peakPowerKw?: number;
  irradianceKwhM2Day: number;
  panelId: string;
  latitude: number;
  longitude: number;
  monthlyCostBs?: number; // Costo real en Bs desde la factura (Gemini OCR)
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

export interface CalculateResponse {
  sizing: SizingResult;
  financial: FinancialResult;
  selectedPanel: PanelOption;
  costs: CostBreakdownItem[];
  environmental: {
    co2AvoidedTons: number;
    treeEquivalent: number;
    waterSavedLiters: number;
  };
  exchangeRate: {
    rate: number;
    source: string;
    updatedAt: string | null;
  };
  scenarios: ScenarioItem[];
}

export function calculateMicrogrid(req: CalculateRequest): CalculateResponse {
  const panel = panelSelector.getById(req.panelId) || panelSelector.getAll()[0];
  const exchangeRateInfo = { rate: getCachedRate(), source: 'dolarapi', updatedAt: null as string | null };
  const BOB_PER_USD = exchangeRateInfo.rate;

  // Usar el costo real de la factura si está disponible, sino estimar
  const monthlyCostBs = req.monthlyCostBs ?? (req.monthlyConsumptionKwh * 0.82);
  const monthlyCreBill = monthlyCostBs / BOB_PER_USD; // Convertir Bs → USD
  const tariffRateBsKwh = monthlyCostBs / req.monthlyConsumptionKwh; // Tarifa real implícita

  // Sizing
  const sizingInput: SizingInput = {
    monthlyConsumptionKwh: req.monthlyConsumptionKwh,
    peakPowerKw: req.peakPowerKw || null,
    irradianceKwhM2Day: req.irradianceKwhM2Day,
    panelWattPeak: panel.wattPeak,
    panelAreaM2: panel.areaM2,
    systemEfficiency: 0.86,
  };
  const sizing = microgridSizer.calculate(sizingInput);

  // Costs breakdown - dinámico según dimensionamiento
  const structureCostPerM2 = 15; // $15/m² estructura de montaje
  const installationCostPerWatt = 0.30; // $0.30/W mano de obra instalación

  // Transporte: escala con cantidad de equipos
  const transportBasePanel = 8; // $8 por panel (paletizado)
  const transportInverter = 50; // $50 por inversor
  const transportBattery = 80; // $80 por módulo de batería (material peligroso)
  const transportMppt = 30; // $30 por MPPT
  const transportBase = 800; // Costo base de envío + gestión aduanera

  const panelCost = sizing.panelCount * panel.priceLanded;
  const inverterCost = sizing.inverterCount * sizing.inverterUnitPrice;
  const batteryCost = sizing.batteryCount * sizing.batteryModulePrice;
  const mpptCost = sizing.mpptCount * sizing.mpptUnitPrice;
  const structureCost = sizing.areaM2 * structureCostPerM2;
  const totalWattPeak = sizing.peakPowerKw * 1000;
  const installCost = totalWattPeak * installationCostPerWatt;

  // Transporte escalable
  const transportCost = transportBase
    + sizing.panelCount * transportBasePanel
    + sizing.inverterCount * transportInverter
    + sizing.batteryCount * transportBattery
    + sizing.mpptCount * transportMppt;

  // Ingeniería + permisos: 8% del hardware
  const hardwareCost = panelCost + inverterCost + batteryCost + mpptCost + structureCost;
  const engineeringCost = hardwareCost * 0.08;

  const totalCapEx = hardwareCost + installCost + transportCost + engineeringCost;

  // O&M: varía según si hay baterías (1.5%) o solo paneles (0.8%) del CapEx
  const oamRate = sizing.batteryCount > 0 ? 0.015 : 0.008;
  const annualOandM = totalCapEx * oamRate;

  const costs: CostBreakdownItem[] = [
    { label: 'Paneles solares', quantity: sizing.panelCount, unitPrice: panel.priceLanded, total: Math.round(panelCost) },
    { label: `Inversor ${sizing.inverterPowerKw}kW`, quantity: sizing.inverterCount, unitPrice: sizing.inverterUnitPrice, total: Math.round(inverterCost) },
    { label: `Batería ${sizing.batteryModuleKwh}kWh`, quantity: sizing.batteryCount, unitPrice: sizing.batteryModulePrice, total: Math.round(batteryCost) },
    { label: `MPPT ${sizing.mpptUnitKw}kW`, quantity: sizing.mpptCount, unitPrice: sizing.mpptUnitPrice, total: Math.round(mpptCost) },
    { label: 'Estructura + cableado', quantity: Math.round(sizing.areaM2), unitPrice: structureCostPerM2, total: Math.round(structureCost) },
    { label: 'Instalación', quantity: totalWattPeak, unitPrice: installationCostPerWatt, total: Math.round(installCost) },
    { label: 'Transporte + aduana', quantity: sizing.panelCount + sizing.inverterCount + sizing.batteryCount + sizing.mpptCount, unitPrice: 0, total: Math.round(transportCost), note: 'Escala con equipos' },
    { label: 'Ingeniería + permisos', quantity: 1, unitPrice: Math.round(engineeringCost), total: Math.round(engineeringCost), note: '8% del hardware' },
  ];

  // Financial
  const financialInput: FinancialInput = {
    totalCapEx,
    monthlyCreBill,
    creAnnualIncrease: 5.2,
    discountRate: 12,
    systemDegradation: 0.5,
    annualOandM,
    dailyGenerationKwh: sizing.dailyGenerationKwh,
    co2FactorKgPerKwh: 0.42,
  };
  const financial = financialCalculator.calculate(financialInput);

  // Scenarios: 3 proyecciones con distintos aumentos de CRE
  const scenarioRates = [
    { label: 'Pesimista', creIncrease: 3.0 },
    { label: 'Base', creIncrease: 5.2 },
    { label: 'Optimista', creIncrease: 8.0 },
  ];
  const scenarios: ScenarioItem[] = scenarioRates.map(({ label, creIncrease }) => {
    const sInput: FinancialInput = {
      ...financialInput,
      creAnnualIncrease: creIncrease,
    };
    const sResult = financialCalculator.calculate(sInput);
    const totalOam25 = Array.from({ length: 25 }, (_, y) => annualOandM * Math.pow(1.03, y)).reduce((a, b) => a + b, 0);
    return {
      label,
      creIncrease,
      totalCre25Years: Math.round(sResult.twentyFiveYearSavings + totalCapEx + totalOam25),
      totalOam25Years: Math.round(totalOam25),
      saving25Years: sResult.twentyFiveYearSavings,
      paybackYears: sResult.paybackYears,
      irr: sResult.irr,
    };
  });

  // Environmental
  const treeEquivalent = Math.round(financial.co2AvoidedTons * 50);
  const waterSavedLiters = Math.round(sizing.dailyGenerationKwh * 365 * 25 * 1.5);

  return {
    sizing,
    financial,
    selectedPanel: panel,
    costs,
    environmental: {
      co2AvoidedTons: financial.co2AvoidedTons,
      treeEquivalent,
      waterSavedLiters,
    },
    exchangeRate: exchangeRateInfo,
    scenarios,
  };
}

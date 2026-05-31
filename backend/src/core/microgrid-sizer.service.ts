import { SizingInput, SizingResult, BatteryModule } from './types.js';

const SYSTEM_EFFICIENCY = 0.86; // 14% losses (inverter, wiring, temperature)
const INVERTER_OVERSIZE_RATIO = 1.2;
const BATTERY_AUTONOMY_DAYS = 0.5; // 50% of daily consumption for nighttime

// Standard inverter sizes with market prices for Bolivia
const INVERTER_OPTIONS = [
  { kw: 3, priceUsd: 450 },
  { kw: 5, priceUsd: 750 },
  { kw: 8, priceUsd: 1100 },
  { kw: 10, priceUsd: 1400 },
  { kw: 15, priceUsd: 1900 },
  { kw: 20, priceUsd: 2400 },
  { kw: 30, priceUsd: 3300 },
  { kw: 50, priceUsd: 5200 },
  { kw: 100, priceUsd: 9500 },
] as const;

// Baterías modulares BYD HVM con precios landed Bolivia
const BATTERY_MODULES: BatteryModule[] = [
  { kwh: 2.5, priceUsd: 1200, model: 'BYD HVM 2.5' },
  { kwh: 5, priceUsd: 2200, model: 'BYD HVM 5.1' },
  { kwh: 10, priceUsd: 3800, model: 'BYD HVM 10.2' },
  { kwh: 15, priceUsd: 5400, model: 'BYD HVM 15.3' },
];

// MPPT Charge controllers
const MPPT_OPTIONS = [
  { kw: 3, priceUsd: 200 },
  { kw: 5, priceUsd: 350 },
  { kw: 8, priceUsd: 500 },
  { kw: 10, priceUsd: 650 },
  { kw: 15, priceUsd: 950 },
  { kw: 20, priceUsd: 1200 },
  { kw: 30, priceUsd: 1700 },
  { kw: 50, priceUsd: 2600 },
] as const;

export class MicrogridSizerService {
  calculate(input: SizingInput): SizingResult {
    const efficiency = input.systemEfficiency || SYSTEM_EFFICIENCY;
    const dailyConsumption = input.monthlyConsumptionKwh / 30;

    // 1. Panels needed
    const dailyGenerationPerPanel = input.panelWattPeak / 1000 * input.irradianceKwhM2Day * efficiency;
    const panelCount = Math.max(1, Math.ceil(dailyConsumption / dailyGenerationPerPanel));

    // 2. Peak power
    const peakPowerKw = (panelCount * input.panelWattPeak) / 1000;

    // 3. Inverter: seleccionar el tamaño estándar más cercano
    const requiredInverterKw = peakPowerKw * INVERTER_OVERSIZE_RATIO;
    const selectedInverter = INVERTER_OPTIONS.find(i => i.kw >= requiredInverterKw) || INVERTER_OPTIONS[INVERTER_OPTIONS.length - 1];
    const inverterCount = 1;
    const inverterUnitKw = selectedInverter.kw;
    const inverterUnitPrice = selectedInverter.priceUsd;

    // 4. Baterías: seleccionar módulo que mejor se ajuste (mínimo 1 módulo)
    const batteryKwhRequired = dailyConsumption * BATTERY_AUTONOMY_DAYS;
    // Encontrar el módulo más pequeño que cubra la necesidad
    let selectedBattery = BATTERY_MODULES[0];
    for (const mod of BATTERY_MODULES) {
      if (mod.kwh >= batteryKwhRequired) { selectedBattery = mod; break; }
      selectedBattery = mod; // si no alcanza, usar el más grande disponible
    }
    const batteryCount = Math.max(1, Math.ceil(batteryKwhRequired / selectedBattery.kwh));
    const selectedBatteryKwh = selectedBattery.kwh;
    const selectedBatteryPrice = selectedBattery.priceUsd;

    // 5. MPPT/Controlador de carga (mismo kW que los paneles)
    const mpptRequiredKw = peakPowerKw;
    const selectedMppt = MPPT_OPTIONS.find(m => m.kw >= mpptRequiredKw) || MPPT_OPTIONS[MPPT_OPTIONS.length - 1];
    const mpptCount = Math.ceil(mpptRequiredKw / selectedMppt.kw);
    const mpptUnitKw = selectedMppt.kw;
    const mpptUnitPrice = selectedMppt.priceUsd;

    // 6. Area required
    const areaM2 = panelCount * input.panelAreaM2;

    // 7. Daily generation
    const dailyGenerationKwh = panelCount * dailyGenerationPerPanel;
    const monthlyGenerationKwh = dailyGenerationKwh * 30;

    return {
      panelCount,
      peakPowerKw: Math.round(peakPowerKw * 10) / 10,
      inverterCount,
      inverterPowerKw: inverterUnitKw,
      inverterUnitPrice,
      batteryCount,
      batteryKwh: Math.round(batteryKwhRequired * 10) / 10,
      batteryModuleKwh: selectedBatteryKwh,
      batteryModulePrice: selectedBatteryPrice,
      mpptCount,
      mpptUnitKw,
      mpptUnitPrice,
      areaM2: Math.round(areaM2 * 10) / 10,
      dailyGenerationKwh: Math.round(dailyGenerationKwh * 10) / 10,
      monthlyGenerationKwh: Math.round(monthlyGenerationKwh * 10) / 10,
    };
  }
}

export const microgridSizer = new MicrogridSizerService();

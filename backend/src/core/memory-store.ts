import { randomUUID } from 'crypto';
import { SizingResult, FinancialResult, CostBreakdownItem } from './types.js';

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

export interface EnvironmentalData {
  co2AvoidedTons: number;
  treeEquivalent: number;
  waterSavedLiters: number;
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

export interface GeminiAnalysis {
  riskAssessment: 'ALTO' | 'MEDIO' | 'BAJO';
  recommendation: string;
  rationale: string;
  initialInsights: string[];
}

export interface BillAnalysis {
  ocr: ExtractedBillData;
  analysis: GeminiAnalysis;
}

export interface SimulationRecord {
  id: string;
  timestamp: Date;
  billAnalysis: BillAnalysis;
  calculation: {
    sizing: SizingResult;
    financial: FinancialResult;
    costs: CostBreakdownItem[];
    environmental: EnvironmentalData;
    scenarios: ScenarioItem[];
  } | null;
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>;
}

export const simulationStore = new Map<string, SimulationRecord>();

const SIMULATION_TTL_MS = 24 * 60 * 60 * 1000;

export function createSimulation(billAnalysis: BillAnalysis): string {
  const id = randomUUID();
  const record: SimulationRecord = {
    id,
    timestamp: new Date(),
    billAnalysis,
    calculation: null,
    conversationHistory: [],
  };
  simulationStore.set(id, record);

  setTimeout(() => simulationStore.delete(id), SIMULATION_TTL_MS);

  return id;
}

export function updateSimulationCalculation(
  id: string,
  calculation: SimulationRecord['calculation']
): boolean {
  const record = simulationStore.get(id);
  if (!record) return false;
  record.calculation = calculation;
  return true;
}

export function addChatMessage(id: string, role: 'user' | 'assistant', content: string): boolean {
  const record = simulationStore.get(id);
  if (!record) return false;
  record.conversationHistory.push({ role, content });
  return true;
}

export function getSimulation(id: string): SimulationRecord | undefined {
  return simulationStore.get(id);
}

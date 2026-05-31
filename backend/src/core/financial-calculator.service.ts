import { FinancialInput, FinancialResult, YearlyBreakdown } from './types.js';

export class FinancialCalculatorService {
  calculate(input: FinancialInput): FinancialResult {
    const years = 25;
    const annualCreCost = input.monthlyCreBill * 12;
    const annualOandM = input.annualOandM;
    const creProjection: number[] = [];
    const oamProjection: number[] = [];
    const netCashflows: number[] = [-input.totalCapEx]; // Year 0: investment

    // Project CRE costs with annual escalation
    for (let year = 0; year < years; year++) {
      const creCost = annualCreCost * Math.pow(1 + input.creAnnualIncrease / 100, year);
      creProjection.push(creCost);
      // O&M también se incrementa con inflación (3% anual)
      const oamCost = annualOandM * Math.pow(1.03, year);
      oamProjection.push(oamCost);
      // Flujo neto: ahorro CRE - costo O&M
      netCashflows.push(creCost - oamCost);
    }

    // Total CapEx per watt
    const totalCapExPerWatt = input.totalCapEx / ((input.dailyGenerationKwh * 365) / 1000);

    // Simple payback (usando ahorro neto anual del primer año)
    const annualNetSaving = annualCreCost - annualOandM;
    const paybackYears = annualNetSaving > 0 ? input.totalCapEx / annualNetSaving : 999;

    // Discounted payback (sobre flujos netos)
    const discountedPaybackYears = this.calculateDiscountedPayback(
      input.totalCapEx,
      netCashflows.slice(1), // solo flujos positivos anuales
      input.discountRate / 100
    );

    // IRR (sobre flujos netos: -CapEx, +ahorro neto cada año)
    const irr = this.calculateIRR(netCashflows);

    // NPV
    const van = this.calculateNPV(input.totalCapEx, netCashflows.slice(1), input.discountRate / 100);

    // LCOE
    const totalKwh25Years = input.dailyGenerationKwh * 365 * years * Math.pow(1 - input.systemDegradation / 100, years / 2);
    const totalCost25Years = input.totalCapEx + annualOandM * years;
    const lcoe = totalCost25Years / totalKwh25Years;

    // CO2 avoided
    const co2AvoidedTons = (input.dailyGenerationKwh * 365 * years * input.co2FactorKgPerKwh) / 1000;

    // Yearly breakdown (con O&M incluido en solarCumulative)
    const yearlyBreakdown = this.generateYearlyBreakdown(input.totalCapEx, creProjection, oamProjection);

    // 25-year savings (CRE total - CapEx - O&M total)
    const totalCre25Years = creProjection.reduce((a, b) => a + b, 0);
    const totalOam25Years = oamProjection.reduce((a, b) => a + b, 0);
    const twentyFiveYearSavings = totalCre25Years - input.totalCapEx - totalOam25Years;

    return {
      totalCapEx: Math.round(input.totalCapEx),
      totalCapExPerWatt: Math.round(totalCapExPerWatt * 1000) / 1000,
      paybackYears: Math.round(paybackYears * 10) / 10,
      discountedPaybackYears: Math.round(discountedPaybackYears * 10) / 10,
      irr: Math.round(irr * 10) / 10,
      van: Math.round(van),
      lcoe: Math.round(lcoe * 1000) / 1000,
      co2AvoidedTons: Math.round(co2AvoidedTons * 10) / 10,
      twentyFiveYearSavings: Math.round(twentyFiveYearSavings),
      yearlyBreakdown,
    };
  }

  private calculateDiscountedPayback(capex: number, cashflows: number[], rate: number): number {
    let cumulativeDcf = 0;
    for (let year = 0; year < cashflows.length; year++) {
      const dcf = cashflows[year] / Math.pow(1 + rate, year + 1);
      cumulativeDcf += dcf;
      if (cumulativeDcf >= capex) {
        return year + 1 - (cumulativeDcf - capex) / dcf;
      }
    }
    return 999;
  }

  private calculateIRR(cashflows: number[]): number {
    const guess = 0.1;
    let irr = guess;
    for (let i = 0; i < 1000; i++) {
      let npv = 0;
      let dnpv = 0;
      for (let t = 0; t < cashflows.length; t++) {
        npv += cashflows[t] / Math.pow(1 + irr, t);
        dnpv -= t * cashflows[t] / Math.pow(1 + irr, t + 1);
      }
      if (Math.abs(npv) < 0.01) break;
      irr = irr - npv / dnpv;
    }
    return irr * 100; // Return as percentage
  }

  private calculateNPV(capex: number, cashflows: number[], rate: number): number {
    let npv = -capex;
    for (let year = 0; year < cashflows.length; year++) {
      npv += cashflows[year] / Math.pow(1 + rate, year + 1);
    }
    return npv;
  }

  private generateYearlyBreakdown(capex: number, creProjection: number[], oamProjection: number[]): YearlyBreakdown[] {
    return creProjection.map((creCost, year) => {
      const cumulativeCre = creProjection.slice(0, year + 1).reduce((a, b) => a + b, 0);
      // Solar cumulative = CapEx + O&M acumulado hasta este año
      const cumulativeOam = oamProjection.slice(0, year + 1).reduce((a, b) => a + b, 0);
      const solarCumulative = capex + cumulativeOam;
      return {
        year: year + 1,
        creCumulative: Math.round(cumulativeCre),
        solarCumulative: Math.round(solarCumulative),
        savings: Math.round(cumulativeCre - solarCumulative),
        breakEven: cumulativeCre >= solarCumulative,
      };
    });
  }
}

export const financialCalculator = new FinancialCalculatorService();

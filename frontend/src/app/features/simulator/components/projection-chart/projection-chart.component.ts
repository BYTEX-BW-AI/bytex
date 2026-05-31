import { Component, Input, AfterViewInit, ViewChild, ElementRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export interface YearlyPoint {
  year: number;
  creCumulative: number;
  solarCumulative: number;
  savings: number;
  breakEven: boolean;
}

@Component({
  selector: 'bytex-projection-chart',
  standalone: true,
  template: `
    <div class="relative">
      <canvas #chartCanvas></canvas>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectionChartComponent implements AfterViewInit, OnDestroy {
  @ViewChild('chartCanvas') canvas!: ElementRef<HTMLCanvasElement>;
  @Input() yearlyData: YearlyPoint[] = [];
  @Input() exchangeRate: number = 9.96;

  private chart: Chart | null = null;

  ngAfterViewInit(): void {
    if (this.yearlyData.length > 0) {
      this.createChart();
    }
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }

  private createChart(): void {
    const ctx = this.canvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const labels = this.yearlyData.map(d => `Año ${d.year}`);
    const creValues = this.yearlyData.map(d => Math.round(d.creCumulative));
    const solarValues = this.yearlyData.map(d => Math.round(d.solarCumulative));

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: '💰 Costo acumulado CRE',
            data: creValues,
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            fill: false,
            tension: 0.3,
            pointRadius: 0,
            borderWidth: 2,
          },
          {
            label: '☀️ Costo acumulado Solar',
            data: solarValues,
            borderColor: '#22c55e',
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            fill: false,
            tension: 0.3,
            pointRadius: 0,
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: 'index',
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#94a3b8',
              font: { size: 12 },
              usePointStyle: true,
              padding: 20,
            },
          },
          tooltip: {
            backgroundColor: '#1e293b',
            titleColor: '#f1f5f9',
            bodyColor: '#94a3b8',
            borderColor: '#334155',
            borderWidth: 1,
            padding: 12,
            callbacks: {
              label: (context) => {
                const value = context.raw as number;
                return ` ${context.dataset.label}: $${value.toLocaleString()}`;
              },
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: '#64748b',
              maxTicksLimit: 13,
              font: { size: 10 },
            },
            grid: {
              color: 'rgba(51, 65, 85, 0.3)',
            },
          },
          y: {
            ticks: {
              color: '#64748b',
              font: { size: 10 },
              callback: (value) => `$${(value as number / 1000).toFixed(0)}k`,
            },
            grid: {
              color: 'rgba(51, 65, 85, 0.3)',
            },
          },
        },
      },
    });
  }
}

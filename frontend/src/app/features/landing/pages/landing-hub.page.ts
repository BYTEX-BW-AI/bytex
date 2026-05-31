import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { APP_ROUTES } from '../../../core/constants/app-routes';

@Component({
  selector: 'bytex-landing-hub-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <!-- Hero -->
    <section class="relative overflow-hidden py-20">
      <div class="absolute inset-0 bg-gradient-to-b from-primary-500/10 to-surface-900 pointer-events-none"></div>
      <div class="relative max-w-7xl mx-auto px-4 text-center">
        <h1 class="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
          ☀️ Bolivia agotó su gas.<br>
          <span class="text-primary-500">Construí tu independencia energética.</span>
        </h1>
        <p class="text-xl text-surface-300 max-w-3xl mx-auto mb-8">
          Gas se acaba en 2031. Tarifa eléctrica subirá a precio internacional.
          Los que instalen ahora pagarán 50–60% menos. ¿Vos estás listo?
        </p>
      </div>
    </section>

    <!-- Dual CTA Cards -->
    <section class="max-w-7xl mx-auto px-4 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">

        <!-- Card 1: Empresas -->
        <a [routerLink]="APP_ROUTES.LANDING.SALES"
           class="group relative overflow-hidden rounded-2xl border border-surface-700 p-10 bg-gradient-to-br from-surface-800 to-surface-900 hover:border-primary-500 transition-all hover:shadow-2xl hover:shadow-primary-500/20 cursor-pointer">
          <div class="relative z-10">
            <div class="text-5xl mb-4">📊</div>
            <h2 class="text-3xl font-bold text-white mb-3">Para Empresas</h2>
            <p class="text-lg text-surface-300 mb-6">
              ¿Cuánto ahorraría tu negocio con energía solar?
            </p>
            <div class="space-y-3 mb-8">
              <div class="flex items-start gap-3">
                <span class="text-primary-500 mt-1">✓</span>
                <p class="text-surface-400">Subí tu factura CRE, la IA dimensiona tu sistema exacto</p>
              </div>
              <div class="flex items-start gap-3">
                <span class="text-primary-500 mt-1">✓</span>
                <p class="text-surface-400">Ve payback real, ROI y escenarios de inversión</p>
              </div>
              <div class="flex items-start gap-3">
                <span class="text-primary-500 mt-1">✓</span>
                <p class="text-surface-400">Conectate con 5+ proveedores certificados en tu zona</p>
              </div>
            </div>
            <div class="inline-flex items-center px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl group-hover:bg-primary-600 transition-all">
              Analiza tu factura
              <span class="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
          <div class="absolute inset-0 bg-gradient-to-r from-primary-500/0 to-primary-500/0 group-hover:from-primary-500/5 group-hover:to-primary-500/10 transition-all"></div>
        </a>

        <!-- Card 2: Proveedores -->
        <a [routerLink]="APP_ROUTES.LANDING.PROVIDERS"
           class="group relative overflow-hidden rounded-2xl border border-surface-700 p-10 bg-gradient-to-br from-surface-800 to-surface-900 hover:border-primary-500 transition-all hover:shadow-2xl hover:shadow-primary-500/20 cursor-pointer">
          <div class="relative z-10">
            <div class="text-5xl mb-4">⚡</div>
            <h2 class="text-3xl font-bold text-white mb-3">Para Instaladores</h2>
            <p class="text-lg text-surface-300 mb-6">
              Accedé a 10-12k empresas bolivianas que buscan proveedores
            </p>
            <div class="space-y-3 mb-8">
              <div class="flex items-start gap-3">
                <span class="text-primary-500 mt-1">✓</span>
                <p class="text-surface-400">Leads pre-calificados que ya conocen su ROI</p>
              </div>
              <div class="flex items-start gap-3">
                <span class="text-primary-500 mt-1">✓</span>
                <p class="text-surface-400">Planes desde $150/mes + 3-5% comisión por deal</p>
              </div>
              <div class="flex items-start gap-3">
                <span class="text-primary-500 mt-1">✓</span>
                <p class="text-surface-400">Dashboard con analytics, leads y contactos</p>
              </div>
            </div>
            <div class="inline-flex items-center px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl group-hover:bg-primary-600 transition-all">
              Registrate como proveedor
              <span class="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
          <div class="absolute inset-0 bg-gradient-to-r from-primary-500/0 to-primary-500/0 group-hover:from-primary-500/5 group-hover:to-primary-500/10 transition-all"></div>
        </a>

      </div>
    </section>

    <!-- Why Bytex -->
    <section class="max-w-7xl mx-auto px-4 py-16 text-center border-t border-surface-700">
      <h2 class="text-3xl font-bold text-white mb-12">¿Por qué Bytex?</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="p-6">
          <span class="text-4xl block mb-3">🤖</span>
          <h3 class="text-lg font-semibold text-white mb-2">Primer simulador IA en Bolivia</h3>
          <p class="text-surface-400">Ninguna otra plataforma combina OCR + dimensionamiento automático + marketplace</p>
        </div>
        <div class="p-6">
          <span class="text-4xl block mb-3">📊</span>
          <h3 class="text-lg font-semibold text-white mb-2">Datos 100% reales</h3>
          <p class="text-surface-400">NASA POWER API, tarifas CRE oficiales, benchmarks INE Bolivia</p>
        </div>
        <div class="p-6">
          <span class="text-4xl block mb-3">✓</span>
          <h3 class="text-lg font-semibold text-white mb-2">Completamente gratis para empresas</h3>
          <p class="text-surface-400">Sin registro, sin tarjeta de crédito, sin formularios</p>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingHubPage {
  protected readonly APP_ROUTES = APP_ROUTES;
}

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'bytex-landing-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <!-- Hero -->
    <section class="relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-primary-500/10 to-surface-900 pointer-events-none"></div>
      <div class="relative max-w-7xl mx-auto px-4 py-24 text-center">
        <h1 class="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
          ☀️ ¿Cuánto le cuesta a tu empresa<br>
          <span class="text-primary-500">no tener paneles solares?</span>
        </h1>
        <p class="text-xl text-surface-300 max-w-2xl mx-auto mb-8">
          Descubrí en 3 minutos si tu negocio ahorraría cambiando de CRE a energía solar.
          Con datos reales de Santa Cruz.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a routerLink="/simulador/tipo"
             class="inline-flex items-center px-8 py-4 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-all shadow-xl shadow-primary-500/25">
            📸 Subí tu factura CRE
          </a>
          <span class="text-surface-500">o</span>
          <a routerLink="/simulador/tipo"
             class="inline-flex items-center px-8 py-4 bg-surface-800 text-surface-200 font-semibold rounded-xl border border-surface-700 hover:bg-surface-700 transition-all">
            🔍 Seleccioná tu rubro
          </a>
        </div>
        <p class="mt-4 text-sm text-surface-500">* No requiere registro. Datos 100% locales de Bolivia.</p>
      </div>
    </section>

    <!-- Stats -->
    <section class="max-w-7xl mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-surface-800 border border-surface-700 rounded-xl p-6 text-center">
          <span class="text-3xl block mb-2">📊</span>
          <h3 class="text-lg font-semibold text-white">Datos Reales</h3>
          <p class="text-sm text-surface-400">NASA POWER + Tarifas CRE + INE Bolivia</p>
        </div>
        <div class="bg-surface-800 border border-surface-700 rounded-xl p-6 text-center">
          <span class="text-3xl block mb-2">🤖</span>
          <h3 class="text-lg font-semibold text-white">IA Gemini</h3>
          <p class="text-sm text-surface-400">Extraé datos de tu factura automáticamente</p>
        </div>
        <div class="bg-surface-800 border border-surface-700 rounded-xl p-6 text-center">
          <span class="text-3xl block mb-2">⚡</span>
          <h3 class="text-lg font-semibold text-white">100% Gratis</h3>
          <p class="text-sm text-surface-400">Sin tarjeta de crédito, sin registro</p>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section class="max-w-7xl mx-auto px-4 py-16">
      <h2 class="text-3xl font-bold text-white text-center mb-12">📋 Así funciona</h2>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="text-center">
          <div class="w-12 h-12 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <span class="text-xl font-bold text-primary-500">1</span>
          </div>
          <p class="text-sm text-surface-300">Subí tu factura CRE o elegí tu sector industrial</p>
        </div>
        <div class="text-center">
          <div class="w-12 h-12 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <span class="text-xl font-bold text-primary-500">2</span>
          </div>
          <p class="text-sm text-surface-300">Gemini IA extrae tu consumo en segundos</p>
        </div>
        <div class="text-center">
          <div class="w-12 h-12 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <span class="text-xl font-bold text-primary-500">3</span>
          </div>
          <p class="text-sm text-surface-300">NASA calcula la irradiación de tu zona</p>
        </div>
        <div class="text-center">
          <div class="w-12 h-12 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <span class="text-xl font-bold text-primary-500">4</span>
          </div>
          <p class="text-sm text-surface-300">Comparamos CRE vs Microred Solar con números reales</p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="max-w-7xl mx-auto px-4 py-16 text-center">
      <h2 class="text-3xl font-bold text-white mb-4">¿Listo para tu simulación?</h2>
      <p class="text-surface-400 mb-6">Descubrí cuánto podés ahorrar con energía solar</p>
      <a routerLink="/simulador/tipo"
         class="inline-flex items-center px-8 py-4 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-all shadow-xl shadow-primary-500/25">
        ⬇ Comenzar simulación
      </a>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPage {}

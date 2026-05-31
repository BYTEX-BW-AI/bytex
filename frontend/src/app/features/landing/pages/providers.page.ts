import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'bytex-providers-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <!-- Hero -->
    <section class="relative overflow-hidden py-20">
      <div class="absolute inset-0 bg-gradient-to-b from-primary-500/10 to-surface-900 pointer-events-none"></div>
      <div class="relative max-w-7xl mx-auto px-4 text-center">
        <h1 class="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
          ⚡ Vende más sistemas solares<br>
          <span class="text-primary-500">sin gasto en marketing</span>
        </h1>
        <p class="text-xl text-surface-300 max-w-3xl mx-auto mb-8">
          Accedé a 10-12k empresas bolivianas que ya corrieron la simulación y saben su ROI.
          Leads pre-calificados listos para comprar.
        </p>
        <a href="#pricing"
           class="inline-flex items-center px-8 py-4 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-all shadow-xl shadow-primary-500/25">
          Ver planes y precios
          <span class="ml-2">→</span>
        </a>
      </div>
    </section>

    <!-- The Opportunity -->
    <section class="max-w-7xl mx-auto px-4 py-16">
      <h2 class="text-3xl font-bold text-white text-center mb-12">La Oportunidad</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-surface-800 border border-surface-700 rounded-xl p-8">
          <div class="text-4xl mb-4">📊</div>
          <h3 class="text-2xl font-bold text-white mb-4">Mercado Validado</h3>
          <ul class="space-y-3 text-surface-300">
            <li class="flex items-start gap-3">
              <span class="text-primary-500 mt-1">•</span>
              <span>117.894 empresas registradas en Santa Cruz</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-primary-500 mt-1">•</span>
              <span>10.000-12.000 energo-intensivas (target principal)</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-primary-500 mt-1">•</span>
              <span>1.350 empresas en PILAT (beachhead perfecto)</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-primary-500 mt-1">•</span>
              <span>Gas de Bolivia se acaba en 2031 = urgencia real</span>
            </li>
          </ul>
        </div>
        <div class="bg-surface-800 border border-surface-700 rounded-xl p-8">
          <div class="text-4xl mb-4">🎯</div>
          <h3 class="text-2xl font-bold text-white mb-4">Leads Calificados</h3>
          <ul class="space-y-3 text-surface-300">
            <li class="flex items-start gap-3">
              <span class="text-primary-500 mt-1">•</span>
              <span>No son curiosos — son empresas que ya decidieron invertir</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-primary-500 mt-1">•</span>
              <span>Conocen su ROI, payback y beneficios exactos</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-primary-500 mt-1">•</span>
              <span>Saben exactamente qué sistema necesitan</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-primary-500 mt-1">•</span>
              <span>Búsqueda activa de proveedores certificados</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Pricing -->
    <section class="max-w-7xl mx-auto px-4 py-16 border-t border-surface-700" id="pricing">
      <h2 class="text-3xl font-bold text-white text-center mb-12">Planes y Precios</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

        <!-- Basic Plan -->
        <div class="relative bg-surface-800 border border-surface-700 rounded-xl p-8 hover:border-primary-500 transition-all">
          <h3 class="text-xl font-bold text-white mb-2">Básico</h3>
          <p class="text-surface-400 mb-6">Para empezar</p>
          <div class="mb-6">
            <span class="text-4xl font-bold text-white">$150</span>
            <span class="text-surface-400">/mes</span>
          </div>
          <ul class="space-y-3 mb-8 text-sm text-surface-300">
            <li class="flex items-center gap-2">
              <span class="text-primary-500">✓</span> Perfil listado en plataforma
            </li>
            <li class="flex items-center gap-2">
              <span class="text-primary-500">✓</span> Acceso a leads de tu zona
            </li>
            <li class="flex items-center gap-2">
              <span class="text-primary-500">✓</span> Contacto directo con empresas
            </li>
          </ul>
          <button class="w-full px-4 py-3 bg-surface-700 text-white font-semibold rounded-lg hover:bg-surface-600 transition-all">
            Seleccionar plan
          </button>
        </div>

        <!-- Professional Plan -->
        <div class="relative bg-surface-800 border-2 border-primary-500 rounded-xl p-8 transform md:scale-105">
          <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span class="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-semibold">Recomendado</span>
          </div>
          <h3 class="text-xl font-bold text-white mb-2">Profesional</h3>
          <p class="text-surface-400 mb-6">La mayoría elige este</p>
          <div class="mb-6">
            <span class="text-4xl font-bold text-white">$350</span>
            <span class="text-surface-400">/mes</span>
          </div>
          <ul class="space-y-3 mb-8 text-sm text-surface-300">
            <li class="flex items-center gap-2">
              <span class="text-primary-500">✓</span> Perfil destacado
            </li>
            <li class="flex items-center gap-2">
              <span class="text-primary-500">✓</span> Badge "Proveedor Verificado"
            </li>
            <li class="flex items-center gap-2">
              <span class="text-primary-500">✓</span> Analytics de leads
            </li>
            <li class="flex items-center gap-2">
              <span class="text-primary-500">✓</span> Más leads priorizados
            </li>
          </ul>
          <button class="w-full px-4 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-all">
            Elegir plan
          </button>
        </div>

        <!-- Premium Plan -->
        <div class="relative bg-surface-800 border border-surface-700 rounded-xl p-8 hover:border-primary-500 transition-all">
          <h3 class="text-xl font-bold text-white mb-2">Premium</h3>
          <p class="text-surface-400 mb-6">Máxima visibilidad</p>
          <div class="mb-6">
            <span class="text-4xl font-bold text-white">$700</span>
            <span class="text-surface-400">/mes</span>
          </div>
          <ul class="space-y-3 mb-8 text-sm text-surface-300">
            <li class="flex items-center gap-2">
              <span class="text-primary-500">✓</span> Posición superior en resultados
            </li>
            <li class="flex items-center gap-2">
              <span class="text-primary-500">✓</span> Integración IoT en app
            </li>
            <li class="flex items-center gap-2">
              <span class="text-primary-500">✓</span> Máximo alcance de leads
            </li>
            <li class="flex items-center gap-2">
              <span class="text-primary-500">✓</span> Soporte prioritario
            </li>
          </ul>
          <button class="w-full px-4 py-3 bg-surface-700 text-white font-semibold rounded-lg hover:bg-surface-600 transition-all">
            Seleccionar plan
          </button>
        </div>

      </div>
      <p class="text-center text-surface-400 mt-8">+ 3-5% comisión por cada proyecto cerrado a través de la plataforma</p>
    </section>

    <!-- How it Works -->
    <section class="max-w-7xl mx-auto px-4 py-16 border-t border-surface-700">
      <h2 class="text-3xl font-bold text-white text-center mb-12">Cómo funciona</h2>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="text-center">
          <div class="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl font-bold text-primary-500">1</span>
          </div>
          <h3 class="font-semibold text-white mb-2">Registrate</h3>
          <p class="text-sm text-surface-400">Crea tu perfil de proveedor con tus servicios y zona</p>
        </div>
        <div class="text-center">
          <div class="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl font-bold text-primary-500">2</span>
          </div>
          <h3 class="font-semibold text-white mb-2">Recibe Leads</h3>
          <p class="text-sm text-surface-400">Empresas te contactan directo desde los resultados</p>
        </div>
        <div class="text-center">
          <div class="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl font-bold text-primary-500">3</span>
          </div>
          <h3 class="font-semibold text-white mb-2">Cotiza y Vende</h3>
          <p class="text-sm text-surface-400">Envía propuesta, negocia y cierra el proyecto</p>
        </div>
        <div class="text-center">
          <div class="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl font-bold text-primary-500">4</span>
          </div>
          <h3 class="font-semibold text-white mb-2">Gana Comisión</h3>
          <p class="text-sm text-surface-400">Recibe 3-5% del proyecto + cuota mensual</p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="max-w-7xl mx-auto px-4 py-16 text-center border-t border-surface-700">
      <h2 class="text-3xl font-bold text-white mb-4">¿Listo para más leads?</h2>
      <p class="text-surface-400 mb-8">Únete a otros proveedores solares en Bolivia. Sin costo de entrada, solo resultados.</p>
      <button class="inline-flex items-center px-8 py-4 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-all shadow-xl shadow-primary-500/25">
        Crear cuenta de proveedor
        <span class="ml-2">→</span>
      </button>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProvidersPage {}

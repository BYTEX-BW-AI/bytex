import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'bytex-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="border-t border-surface-700/50 bg-surface-900">
      <div class="max-w-7xl mx-auto px-4 py-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div class="flex items-center gap-2 mb-3">
              <span class="text-2xl">☀️</span>
              <span class="text-lg font-bold text-white">Bytex</span>
            </div>
            <p class="text-sm text-surface-400">
              Simulador de Soberanía Energética para empresas de Santa Cruz, Bolivia.
            </p>
          </div>
          <div>
            <h4 class="text-sm font-semibold text-white mb-3">Enlaces</h4>
            <ul class="space-y-2">
              <li><a routerLink="/simulador/tipo" class="text-sm text-surface-400 hover:text-white transition-colors">Simulador</a></li>
              <li><a routerLink="/dashboard" class="text-sm text-surface-400 hover:text-white transition-colors">Dashboard</a></li>
              <li><a routerLink="/aprender" class="text-sm text-surface-400 hover:text-white transition-colors">Aprender</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-sm font-semibold text-white mb-3">Contacto</h4>
            <p class="text-sm text-surface-400">
              Hecho en Santa Cruz 🇧🇴<br>
              GDG Build With AI 2026
            </p>
          </div>
        </div>
        <div class="mt-8 pt-6 border-t border-surface-700/50 text-center">
          <p class="text-sm text-surface-500">© 2026 Bytex. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
}

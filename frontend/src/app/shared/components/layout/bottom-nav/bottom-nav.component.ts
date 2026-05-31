import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'bytex-bottom-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="fixed bottom-0 left-0 right-0 z-40 bg-surface-800/95 backdrop-blur-xl border-t border-surface-700 md:hidden">
      <div class="flex items-center justify-around h-16">
        <a routerLink="/"
           routerLinkActive="text-primary-500"
           [routerLinkActiveOptions]="{exact: true}"
           class="flex flex-col items-center gap-0.5 text-surface-400 hover:text-white transition-colors text-xs">
          <span class="text-lg">🏠</span>
          <span>Inicio</span>
        </a>
        <a routerLink="/simulador/tipo"
           routerLinkActive="text-primary-500"
           class="flex flex-col items-center gap-0.5 text-surface-400 hover:text-white transition-colors text-xs">
          <span class="text-lg">☀️</span>
          <span>Simular</span>
        </a>
        <a routerLink="/dashboard"
           routerLinkActive="text-primary-500"
           class="flex flex-col items-center gap-0.5 text-surface-400 hover:text-white transition-colors text-xs">
          <span class="text-lg">📊</span>
          <span>Dashboard</span>
        </a>
        <a routerLink="/aprender"
           routerLinkActive="text-primary-500"
           class="flex flex-col items-center gap-0.5 text-surface-400 hover:text-white transition-colors text-xs">
          <span class="text-lg">📖</span>
          <span>Aprender</span>
        </a>
        <a routerLink="/login"
           routerLinkActive="text-primary-500"
           class="flex flex-col items-center gap-0.5 text-surface-400 hover:text-white transition-colors text-xs">
          <span class="text-lg">👤</span>
          <span>Perfil</span>
        </a>
      </div>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BottomNavComponent {
}

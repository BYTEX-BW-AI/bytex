import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'bytex-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="sticky top-0 z-40 bg-surface-900/80 backdrop-blur-xl border-b border-surface-700/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <a routerLink="/" class="flex items-center gap-2">
            <span class="text-2xl">☀️</span>
            <span class="text-xl font-bold text-white">Bytex</span>
          </a>

          <!-- Nav Desktop -->
          <nav class="hidden md:flex items-center gap-6">
            <a routerLink="/simulador/tipo"
               routerLinkActive="text-primary-500"
               class="text-sm text-surface-300 hover:text-white transition-colors">
              Simulador
            </a>
            <a routerLink="/dashboard"
               routerLinkActive="text-primary-500"
               class="text-sm text-surface-300 hover:text-white transition-colors">
              Dashboard
            </a>
            <a routerLink="/aprender"
               routerLinkActive="text-primary-500"
               class="text-sm text-surface-300 hover:text-white transition-colors">
              Aprender
            </a>

            <!-- Auth -->
            @if (userSig(); as u) {
              <div class="flex items-center gap-3">
                <span class="text-sm text-surface-400">{{ u.displayName }}</span>
                <button
                  class="text-sm text-surface-400 hover:text-white transition-colors"
                  (click)="onLogout()"
                >
                  Salir
                </button>
              </div>
            } @else {
              <a routerLink="/login"
                 class="text-sm bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors">
                Ingresar
              </a>
            }
          </nav>
        </div>
      </div>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  protected authService = inject(AuthService);
  protected userSig = toSignal(this.authService.user$, { initialValue: null });

  onLogout(): void {
    this.authService.logout().subscribe();
  }
}

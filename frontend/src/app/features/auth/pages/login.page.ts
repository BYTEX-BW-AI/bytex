import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthFacade } from '../data-access/services/auth-facade';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';
import { APP_ROUTES } from '../../../core/constants/app-routes';

@Component({
  selector: 'bytex-login-page',
  standalone: true,
  imports: [RouterLink, ButtonComponent],
  template: `
    <div class="min-h-[80vh] flex items-center justify-center px-4">
      <div class="max-w-md w-full">
        <div class="text-center mb-8">
          <span class="text-5xl block mb-4">☀️</span>
          <h1 class="text-3xl font-bold text-white mb-2">Bienvenido a Bytex</h1>
          <p class="text-surface-400">
            Ingresá para guardar tus simulaciones y acceder a tu historial.
          </p>
        </div>

        <div class="bg-surface-800 border border-surface-700 rounded-xl p-8">
          @if (facade.error()) {
            <div class="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg text-sm text-red-200">
              {{ facade.error() }}
            </div>
          }

          <bytex-button
            variant="primary"
            size="lg"
            [loading]="facade.loading()"
            icon="🔵"
            (clicked)="onLoginWithGoogle()"
            class="w-full"
          >
            Ingresar con Google
          </bytex-button>

          <p class="mt-4 text-xs text-surface-500 text-center">
            Al ingresar, aceptás nuestros términos y condiciones.
          </p>
        </div>

        <div class="mt-6 text-center">
          <a [routerLink]="APP_ROUTES.SIMULATOR.TYPE" class="text-sm text-primary-500 hover:text-primary-400 transition-colors">
            ⬇ Simular sin registro
          </a>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
  protected facade = inject(AuthFacade);
  protected APP_ROUTES = APP_ROUTES;

  onLoginWithGoogle(): void {
    this.facade.loginWithGoogle();
  }
}

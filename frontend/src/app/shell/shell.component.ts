import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../shared/components/layout/header/header.component';
import { FooterComponent } from '../shared/components/layout/footer/footer.component';
import { BottomNavComponent } from '../shared/components/layout/bottom-nav/bottom-nav.component';
import { ToastContainerComponent } from '../shared/components/ui/toast/toast-container.component';

@Component({
  selector: 'bytex-shell',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    BottomNavComponent,
    ToastContainerComponent,
  ],
  template: `
    <div class="min-h-screen bg-surface-900 flex flex-col">
      <bytex-header />
      <main class="flex-1">
        <router-outlet />
      </main>
      <bytex-footer />
      <bytex-bottom-nav />
      <bytex-toast-container />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {}

import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'bytex-toast-container',
  standalone: true,
  template: `
    <div class="fixed top-4 right-4 z-50 flex flex-col gap-3 w-80">
      @for (toast of notification.toasts(); track toast.id) {
        <div
          [class]="toastClass(toast.type)"
          role="alert"
        >
          <div class="flex items-start gap-3">
            <span class="text-lg flex-shrink-0">{{ toastIcon(toast.type) }}</span>
            <p class="text-sm flex-1">{{ toast.message }}</p>
            <button
              class="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
              (click)="notification.remove(toast.id)"
            >
              ✕
            </button>
          </div>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastContainerComponent {
  notification = inject(NotificationService);

  toastClass(type: string): string {
    const base = 'px-4 py-3 rounded-lg shadow-xl border backdrop-blur-sm animate-slide-in';
    const types: Record<string, string> = {
      success: 'bg-green-900/90 border-green-700 text-green-100',
      error: 'bg-red-900/90 border-red-700 text-red-100',
      warning: 'bg-yellow-900/90 border-yellow-700 text-yellow-100',
      info: 'bg-blue-900/90 border-blue-700 text-blue-100',
    };
    return `${base} ${types[type] || types.info}`;
  }

  toastIcon(type: string): string {
    const icons: Record<string, string> = {
      success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️',
    };
    return icons[type] || 'ℹ️';
  }
}

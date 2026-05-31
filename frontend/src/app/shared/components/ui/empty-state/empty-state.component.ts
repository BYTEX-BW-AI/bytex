import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'bytex-empty-state',
  standalone: true,
  template: `
    <div class="flex flex-col items-center justify-center py-12 text-center">
      <div class="text-5xl mb-4">{{ icon() }}</div>
      <h3 class="text-lg font-semibold text-white mb-2">{{ title() }}</h3>
      @if (message()) {
        <p class="text-surface-400 max-w-md mb-6">{{ message() }}</p>
      }
      @if (actionLabel()) {
        <button
          class="inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          (click)="action.emit()"
        >
          {{ actionLabel() }}
        </button>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyStateComponent {
  icon = input<string>('📋');
  title = input<string>('Sin datos');
  message = input<string>();
  actionLabel = input<string>();
  action = output<void>();
}

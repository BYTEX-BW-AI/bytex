import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'bytex-card',
  standalone: true,
  template: `
    <div [class]="cardClasses()">
      @if (title() || subtitle()) {
        <div class="px-6 py-4 border-b border-surface-700">
          @if (title()) {
            <h3 class="text-lg font-semibold text-white">{{ title() }}</h3>
          }
          @if (subtitle()) {
            <p class="mt-1 text-sm text-surface-400">{{ subtitle() }}</p>
          }
        </div>
      }
      <div class="px-6 py-4">
        <ng-content />
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  title = input<string>();
  subtitle = input<string>();
  padding = input<boolean>(true);

  cardClasses = () => {
    const base = 'bg-surface-800 border border-surface-700 rounded-xl shadow-lg';
    return `${base}`;
  };
}

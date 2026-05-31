import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'bytex-spinner',
  standalone: true,
  template: `
    <div class="flex flex-col items-center justify-center" [class]="containerClass()">
      <svg class="animate-spin" [class]="spinnerClass()" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
      </svg>
      @if (label()) {
        <p class="mt-3 text-sm text-surface-400">{{ label() }}</p>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {
  size = input<'sm' | 'md' | 'lg'>('md');
  label = input<string>();

  containerClass = () => {
    const sizes = { sm: 'py-4', md: 'py-8', lg: 'py-16' };
    return sizes[this.size()];
  };

  spinnerClass = () => {
    const sizes = { sm: 'h-5 w-5 text-primary-500', md: 'h-8 w-8 text-primary-500', lg: 'h-12 w-12 text-primary-500' };
    return sizes[this.size()];
  };
}

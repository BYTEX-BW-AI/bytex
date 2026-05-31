import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SimulatorFacade } from '../../data-access/services/simulator-facade';
import { ButtonComponent } from '../../../../shared/components/ui/button/button.component';

@Component({
  selector: 'bytex-chat-widget',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-surface-800 border border-surface-700 rounded-xl p-4">
      <h3 class="text-lg font-semibold text-white mb-3">💬 Preguntá sobre tu simulación</h3>

      <div class="space-y-3 max-h-64 overflow-y-auto mb-4 bg-surface-900 p-3 rounded">
        @if (facade.conversationHistory().length === 0) {
          <p class="text-xs text-surface-400 italic">Ningún mensaje aún...</p>
        }
        @for (msg of facade.conversationHistory(); track $index) {
          <div [ngClass]="msg.role === 'user' ? 'text-right' : 'text-left'">
            <div [ngClass]="[
              'inline-block px-3 py-2 rounded-lg text-sm max-w-xs',
              msg.role === 'user'
                ? 'bg-primary-600 text-white'
                : 'bg-surface-700 text-surface-200'
            ]">
              {{ msg.content }}
            </div>
          </div>
        }
      </div>

      <div class="flex gap-2">
        <input
          #input
          type="text"
          class="flex-1 bg-surface-700 border border-surface-600 rounded px-3 py-2 text-sm text-white placeholder-surface-500 focus:outline-none focus:border-primary-500"
          placeholder="¿Por qué...? ¿Puedo...? ¿Qué si...?"
          (keyup.enter)="onSendMessage(input.value); input.value = ''"
          [disabled]="facade.isChattingLoading()"
        />
        <bytex-button
          size="sm"
          variant="primary"
          (clicked)="onSendMessage(input.value); input.value = ''"
          [disabled]="facade.isChattingLoading()"
        >
          {{ facade.isChattingLoading() ? '...' : 'Enviar' }}
        </bytex-button>
      </div>

      @if (facade.chatError()) {
        <p class="text-xs text-red-400 mt-2">{{ facade.chatError() }}</p>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ChatWidgetComponent {
  protected facade = inject(SimulatorFacade);

  onSendMessage(question: string): void {
    if (!question.trim()) return;
    this.facade.chatAsk(question);
  }
}

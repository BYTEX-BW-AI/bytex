import { Component, output, signal, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'bytex-file-uploader',
  standalone: true,
  template: `
    <div
      class="relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer"
      [class]="isDragging() ? 'border-primary-500 bg-primary-500/10' : 'border-surface-600 hover:border-surface-500 hover:bg-surface-700/50'"
      (dragover)="onDragOver($event)"
      (dragleave)="onDragLeave()"
      (drop)="onDrop($event)"
      (click)="fileInput.click()"
    >
      <input
        #fileInput
        type="file"
        accept="image/*,application/pdf"
        class="hidden"
        (change)="onFileSelected($event)"
      />

      @if (!previewUrl()) {
        <div class="flex flex-col items-center gap-3">
          <div class="text-4xl">📸</div>
          <h3 class="text-lg font-semibold text-white">Subí tu factura CRE</h3>
          <p class="text-sm text-surface-400">
            Arrastrá tu factura acá o hacé clic para seleccionarla
          </p>
          <p class="text-xs text-surface-500">
            Formatos: JPG, PNG, PDF • Máx: 10MB
          </p>
        </div>
      } @else {
        <div class="relative">
          <img [src]="previewUrl()" alt="Factura" class="max-h-64 mx-auto rounded-lg shadow-lg" />
          <button
            class="absolute top-2 right-2 bg-surface-900/80 text-white rounded-full p-1.5 hover:bg-surface-900 transition-colors"
            (click)="removeFile(); $event.stopPropagation()"
          >
            ✕
          </button>
        </div>
        <p class="mt-3 text-sm text-surface-400">{{ fileName() }}</p>
      }

      @if (error()) {
        <p class="mt-3 text-sm text-danger flex items-center justify-center gap-1">
          <span>⚠️</span> {{ error() }}
        </p>
      }
    </div>

    <div class="mt-4 text-center">
      <p class="text-sm text-surface-500">
        📱 También podés sacarle una foto con tu celular
      </p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploaderComponent {
  fileSelected = output<File>();
  fileRemoved = output<void>();

  previewUrl = signal<string | null>(null);
  fileName = signal<string>('');
  error = signal<string | null>(null);
  isDragging = signal(false);

  private maxSize = 10 * 1024 * 1024; // 10MB

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(true);
  }

  onDragLeave(): void {
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
    const file = event.dataTransfer?.files[0];
    if (file) this.processFile(file);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) this.processFile(file);
  }

  removeFile(): void {
    this.previewUrl.set(null);
    this.fileName.set('');
    this.error.set(null);
    this.fileRemoved.emit();
  }

  private processFile(file: File): void {
    this.error.set(null);

    // Validar tipo
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      this.error.set('Formato no soportado. Usá JPG, PNG o PDF.');
      return;
    }

    // Validar tamaño
    if (file.size > this.maxSize) {
      this.error.set('El archivo es demasiado grande. Máximo 10MB.');
      return;
    }

    this.fileName.set(file.name);

    // Crear preview para imágenes
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrl.set(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      this.previewUrl.set('assets/icons/pdf-icon.svg');
    }

    this.fileSelected.emit(file);
  }
}

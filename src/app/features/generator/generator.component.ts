import { Component, inject, signal, computed, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageService, GeneratedImage } from '../../core/services/image.service';
import { GalleryService } from '../../core/services/gallery.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-generator',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page page-wide">
      <!-- Hero -->
      <div class="card-hero mb-6 animate-fadeIn">
        <h2 class="card-hero__title">Generador de Imagenes IA</h2>
        <p class="card-hero__desc">
          Describe lo que imaginas y la IA lo creara por ti. Escribe un prompt detallado para obtener mejores resultados.
        </p>
      </div>

      <!-- Form -->
      <section aria-label="Formulario de generacion" class="animate-fadeInUp mb-8">
        <div class="card">
          <div class="stack">
            <div>
              <label for="prompt-input" class="label">
                Describe tu imagen <span style="color: #DC2626" aria-hidden="true">*</span>
                <span class="sr-only">(requerido)</span>
              </label>
              <textarea
                id="prompt-input"
                [value]="prompt()"
                (input)="onPromptChange($event)"
                (keydown)="onKeyDown($event)"
                placeholder="Ej: Un gato astronauta flotando en el espacio con auroras boreales de fondo..."
                [attr.maxlength]="maxLength"
                rows="4"
                class="textarea"
                aria-describedby="char-count prompt-hint"
                [attr.aria-invalid]="errorMessage() ? 'true' : null"
                [class.input--error]="errorMessage()">
              </textarea>
              <div class="flex justify-between mt-2">
                <span id="prompt-hint" style="font-size: 12px; color: var(--color-text-placeholder)">
                  Ctrl+Enter para generar
                </span>
                <span id="char-count" style="font-size: 12px; color: var(--color-text-muted)"
                      aria-live="polite" aria-atomic="true">
                  {{ prompt().length }}/{{ maxLength }}
                </span>
              </div>
            </div>

            <button
              type="button"
              class="btn btn-cta w-full"
              [disabled]="!prompt() || prompt().trim().length < 5 || loading()"
              (click)="onGenerate()"
              aria-label="Generar imagen con el prompt actual">
              <svg *ngIf="!loading()" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              <svg *ngIf="loading()" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4"></path>
              </svg>
              {{ loading() ? 'Generando...' : 'Generar Imagen' }}
            </button>

            <div *ngIf="errorMessage()" class="alert alert-error animate-scaleIn" role="alert" aria-live="assertive">
              <svg class="alert__icon" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
              </svg>
              <div class="alert__content">{{ errorMessage() }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Loading indicator (subtle, inline with button) -->
      <div *ngIf="loading()" class="flex items-center justify-center gap-3 animate-fadeIn mb-6"
           style="padding: 12px 0">
        <div class="loading-dots">
          <span></span><span></span><span></span>
        </div>
        <span style="font-size: 13px; color: var(--color-text-muted)">Generando imagen...</span>
      </div>

      <!-- Gallery Grid -->
      <section *ngIf="visibleImages().length > 0" aria-label="Galeria de imagenes">
        <div class="flex items-center justify-between mb-4 animate-fadeIn">
          <h3 class="font-display font-bold text-forest" style="font-size: 20px">
            Galeria
          </h3>
          <span style="font-size: 13px; color: var(--color-text-muted)">
            {{ visibleImages().length }} imagen{{ visibleImages().length !== 1 ? 'es' : '' }}
          </span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px" class="stagger-children">
          <div
            *ngFor="let item of visibleImages(); let i = index"
            class="card cursor-pointer hover-lift animate-fadeIn"
            style="padding: 0; overflow: hidden"
            (click)="openPreview(item.originalIndex)"
            (keydown.enter)="openPreview(item.originalIndex)"
            tabindex="0"
            [attr.aria-label]="'Ver imagen: ' + item.image.prompt">
            <!-- Image -->
            <div style="position: relative; width: 100%; height: 200px; overflow: hidden; background: var(--color-bg-muted)">
              <img
                [src]="item.image.url"
                [alt]="item.image.prompt"
                style="width: 100%; height: 100%; object-fit: cover"
                loading="lazy" />
            </div>
            <!-- Info -->
            <div style="padding: 10px 12px">
              <p class="line-clamp-2" style="font-size: 12px; color: var(--color-text-secondary); margin: 0; line-height: 1.4">
                {{ item.image.prompt }}
              </p>
              <div class="flex items-center justify-between mt-2">
                <span style="font-size: 10px; color: var(--color-text-placeholder)">
                  Click para ampliar
                </span>
                <div class="flex gap-1">
                  <button
                    class="btn btn-icon"
                    style="width: 28px; height: 28px"
                    (click)="gallery.download(item.originalIndex); $event.stopPropagation()"
                    aria-label="Descargar imagen">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                    </svg>
                  </button>
                  <button
                    class="btn btn-icon"
                    style="color: #DC2626; width: 28px; height: 28px"
                    (click)="confirmDelete(item.originalIndex); $event.stopPropagation()"
                    aria-label="Eliminar imagen">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Empty gallery -->
      <div *ngIf="!loading() && visibleImages().length === 0" class="card animate-fadeIn">
        <div class="empty-state">
          <svg class="empty-state__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z">
            </path>
          </svg>
          <div class="empty-state__title">Sin imagenes aun</div>
          <div class="empty-state__desc">Escribe un prompt y genera tu primera imagen</div>
        </div>
      </div>
    </div>

    <!-- Image Preview Popup -->
    <div *ngIf="previewIndex() !== null"
         class="overlay animate-fadeIn"
         role="dialog" aria-modal="true" aria-label="Vista previa de imagen"
         (click)="closePreview()"
         style="z-index: 50; display: flex; align-items: center; justify-content: center; padding: 24px">
      <div class="animate-scaleIn"
           style="position: relative; max-width: 90vw; max-height: 90vh; display: flex; flex-direction: column; align-items: center"
           (click)="$event.stopPropagation()">
        <!-- Close button -->
        <button
          class="btn btn-icon"
          (click)="closePreview()"
          aria-label="Cerrar vista previa"
          style="position: absolute; top: -16px; right: -16px; z-index: 10; background: white; border-radius: 9999px; width: 36px; height: 36px; box-shadow: 0 2px 8px rgba(0,0,0,0.15)">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <!-- Image -->
        <img
          [src]="gallery.images()[previewIndex()!].url"
          [alt]="gallery.images()[previewIndex()!].prompt"
          style="max-width: 100%; max-height: 80vh; object-fit: contain; border-radius: var(--radius-lg); box-shadow: 0 16px 48px rgba(0,0,0,0.3)"
          />

        <!-- Caption + actions -->
        <div class="glass-strong animate-fadeInUp"
             style="margin-top: 16px; padding: 12px 20px; border-radius: var(--radius-lg); max-width: 600px; text-align: center">
          <p style="font-size: 14px; color: var(--color-text-primary); margin: 0 0 8px 0; line-height: 1.5">
            {{ gallery.images()[previewIndex()!].prompt }}
          </p>
          <div class="flex items-center justify-center gap-3">
            <button class="btn btn-ghost" (click)="gallery.download(previewIndex()!)">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
              Descargar
            </button>
            <button class="btn btn-danger" (click)="confirmDelete(previewIndex()!); closePreview()">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
              Eliminar
            </button>
          </div>
        </div>

        <!-- Navigation arrows -->
        <button *ngIf="previewIndex()! > 0"
                class="btn btn-icon"
                (click)="previewIndex.set(previewIndex()! - 1)"
                aria-label="Imagen anterior"
                style="position: absolute; left: -48px; top: 50%; transform: translateY(-50%); background: white; border-radius: 9999px; width: 40px; height: 40px; box-shadow: 0 2px 8px rgba(0,0,0,0.15)">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <button *ngIf="previewIndex()! < gallery.count() - 1"
                class="btn btn-icon"
                (click)="previewIndex.set(previewIndex()! + 1)"
                aria-label="Imagen siguiente"
                style="position: absolute; right: -48px; top: 50%; transform: translateY(-50%); background: white; border-radius: 9999px; width: 40px; height: 40px; box-shadow: 0 2px 8px rgba(0,0,0,0.15)">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Delete confirmation modal -->
    <div *ngIf="deleteConfirmIndex() !== null"
         class="overlay animate-fadeIn"
         role="dialog" aria-modal="true" aria-label="Confirmar eliminacion"
         (click)="deleteConfirmIndex.set(null)"
         (keydown.escape)="deleteConfirmIndex.set(null)"
         style="z-index: 60; display: flex; align-items: center; justify-content: center">
      <div class="card animate-scaleIn" style="max-width: 380px; margin: 16px"
           (click)="$event.stopPropagation()">
        <h3 class="font-display font-bold text-forest mb-2" style="font-size: 18px">Eliminar imagen</h3>
        <p style="font-size: 14px; color: var(--color-text-muted); margin-bottom: 16px">
          Esta accion no se puede deshacer. La imagen se eliminara permanentemente.
        </p>
        <div class="flex justify-end gap-3">
          <button class="btn btn-secondary" (click)="deleteConfirmIndex.set(null)">Cancelar</button>
          <button class="btn btn-danger" (click)="executeDelete()">Eliminar</button>
        </div>
      </div>
    </div>
  `,
})
export class GeneratorComponent implements OnDestroy {
  private readonly imageService = inject(ImageService);
  protected readonly gallery = inject(GalleryService);

  readonly prompt = signal('');
  readonly loading = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly deleteConfirmIndex = signal<number | null>(null);
  readonly previewIndex = signal<number | null>(null);
  readonly maxLength = 1200;

  readonly visibleImages = computed(() =>
    this.gallery.images()
      .map((image, originalIndex) => ({ image, originalIndex }))
      .filter(item => !!item.image.url)
  );

  private subscription: Subscription | null = null;

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.previewIndex() !== null) {
      this.closePreview();
    }
  }

  @HostListener('document:keydown.arrowleft')
  onArrowLeft(): void {
    const idx = this.previewIndex();
    if (idx !== null && idx > 0) {
      this.previewIndex.set(idx - 1);
    }
  }

  @HostListener('document:keydown.arrowright')
  onArrowRight(): void {
    const idx = this.previewIndex();
    if (idx !== null && idx < this.gallery.count() - 1) {
      this.previewIndex.set(idx + 1);
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onPromptChange(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.prompt.set(target.value);
    this.errorMessage.set(null);
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && event.ctrlKey) {
      event.preventDefault();
      if (this.canGenerate()) {
        this.onGenerate();
      }
    }
  }

  onGenerate(): void {
    const currentPrompt = this.prompt().trim();

    if (currentPrompt.length < 5) {
      this.errorMessage.set('El prompt debe tener al menos 5 caracteres.');
      return;
    }

    this.loading.set(true);
    this.errorMessage.set(null);

    this.subscription = this.imageService.generateImage(currentPrompt).subscribe({
      next: (image: GeneratedImage) => {
        this.loading.set(false);
        this.gallery.add(image);
        this.prompt.set('');
      },
      error: (error) => {
        this.loading.set(false);
        this.errorMessage.set(this.getErrorMessage(error));
      },
    });
  }

  openPreview(index: number): void {
    this.previewIndex.set(index);
  }

  closePreview(): void {
    this.previewIndex.set(null);
  }

  confirmDelete(index: number): void {
    this.deleteConfirmIndex.set(index);
  }

  executeDelete(): void {
    const idx = this.deleteConfirmIndex();
    if (idx !== null) {
      this.gallery.delete(idx);
      this.deleteConfirmIndex.set(null);
    }
  }

  private canGenerate(): boolean {
    const p = this.prompt();
    return !!p && p.trim().length >= 5 && !this.loading();
  }

  private getErrorMessage(error: any): string {
    const detail = error.error?.error || error.error?.detail;

    if (error.status === 0) {
      return 'Error de conexion. Asegurate de que el proxy este corriendo (npm run proxy:dev).';
    }
    if (error.status === 400) {
      return detail || 'El prompt fue rechazado. Intenta con una descripcion diferente.';
    }
    if (error.status === 402) {
      return 'Cuota de API agotada. Revisa tu facturacion en OpenAI.';
    }
    if (error.status === 429) {
      return 'Demasiadas solicitudes. Espera un momento e intenta de nuevo.';
    }
    if (error.status === 408 || error.name === 'TimeoutError') {
      return 'Tiempo de espera agotado. La generacion de imagen tardo demasiado.';
    }
    if (error.status >= 500) {
      return 'Error del servidor. Intenta con un prompt diferente.';
    }
    return `Error generando imagen: ${detail || error.message || 'Error desconocido'}`;
  }
}

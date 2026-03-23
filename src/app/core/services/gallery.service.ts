import { Injectable, inject, signal, computed } from '@angular/core';
import { ImageService, GeneratedImage } from './image.service';

@Injectable({ providedIn: 'root' })
export class GalleryService {
  private readonly imageService = inject(ImageService);

  readonly images = signal<GeneratedImage[]>([]);
  readonly count = computed(() => this.images().length);

  constructor() {
    this.loadImages();
  }

  loadImages(): void {
    this.imageService.getImages().subscribe({
      next: (imgs) => this.images.set(imgs),
      error: (err) => console.error('Failed to load gallery:', err),
    });
  }

  add(image: GeneratedImage): void {
    this.images.update(imgs => [image, ...imgs]);
  }

  delete(index: number): void {
    const img = this.images()[index];
    if (!img) return;

    this.imageService.deleteImage(img.id).subscribe({
      next: () => {
        this.images.update(imgs => imgs.filter((_, i) => i !== index));
      },
      error: (err) => console.error('Failed to delete:', err),
    });
  }

  download(index: number): void {
    const image = this.images()[index];
    if (!image) return;

    fetch(image.url)
      .then(res => res.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `imagen-${image.id}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      })
      .catch(err => console.error('Download error:', err));
  }
}

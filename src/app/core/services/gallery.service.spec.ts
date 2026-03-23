import { TestBed } from '@angular/core/testing';
import { GalleryService } from './gallery.service';

describe('GalleryService', () => {
  let service: GalleryService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(GalleryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with empty gallery', () => {
    expect(service.count()).toBe(0);
    expect(service.selectedIndex()).toBeNull();
    expect(service.selectedImage()).toBeNull();
  });

  it('should add an image', () => {
    service.add('blob:test-url', 'test prompt');
    expect(service.count()).toBe(1);
    expect(service.selectedIndex()).toBe(0);
    expect(service.images()[0].prompt).toBe('test prompt');
    expect(service.images()[0].url).toBe('blob:test-url');
  });

  it('should add images at the beginning', () => {
    service.add('blob:url1', 'prompt 1');
    service.add('blob:url2', 'prompt 2');
    expect(service.images()[0].prompt).toBe('prompt 2');
    expect(service.images()[1].prompt).toBe('prompt 1');
  });

  it('should select an image by index', () => {
    service.add('blob:url1', 'prompt 1');
    service.add('blob:url2', 'prompt 2');
    service.select(1);
    expect(service.selectedIndex()).toBe(1);
    expect(service.selectedImage()?.prompt).toBe('prompt 1');
  });

  it('should not select invalid index', () => {
    service.add('blob:url1', 'prompt 1');
    service.select(5);
    expect(service.selectedIndex()).toBe(0); // stays at 0 from add()
  });

  it('should delete an image', () => {
    service.add('blob:url1', 'prompt 1');
    service.add('blob:url2', 'prompt 2');
    const result = service.delete(0);
    expect(result).toBeTrue();
    expect(service.count()).toBe(1);
    expect(service.images()[0].prompt).toBe('prompt 1');
  });

  it('should handle deleting the selected image', () => {
    service.add('blob:url1', 'prompt 1');
    service.add('blob:url2', 'prompt 2');
    service.select(0);
    service.delete(0);
    expect(service.selectedIndex()).toBe(0);
  });

  it('should handle deleting the only image', () => {
    service.add('blob:url1', 'prompt 1');
    service.delete(0);
    expect(service.count()).toBe(0);
    expect(service.selectedIndex()).toBeNull();
    expect(service.selectedImage()).toBeNull();
  });

  it('should adjust selected index when deleting before selected', () => {
    service.add('blob:url1', 'prompt 1');
    service.add('blob:url2', 'prompt 2');
    service.add('blob:url3', 'prompt 3');
    service.select(2);
    service.delete(0);
    expect(service.selectedIndex()).toBe(1);
  });

  it('should return false for invalid delete index', () => {
    expect(service.delete(-1)).toBeFalse();
    expect(service.delete(0)).toBeFalse();
  });

  it('should generate unique IDs for each image', () => {
    service.add('blob:url1', 'prompt 1');
    service.add('blob:url2', 'prompt 2');
    expect(service.images()[0].id).not.toBe(service.images()[1].id);
  });

  it('should persist gallery metadata to localStorage', () => {
    service.add('blob:url1', 'prompt 1');
    const stored = localStorage.getItem('imagegen-gallery');
    expect(stored).toBeTruthy();
    const data = JSON.parse(stored!);
    expect(data.length).toBe(1);
    expect(data[0].prompt).toBe('prompt 1');
  });

  it('should compute selectedImage correctly', () => {
    service.add('blob:url1', 'my prompt');
    const selected = service.selectedImage();
    expect(selected).toBeTruthy();
    expect(selected!.prompt).toBe('my prompt');
  });
});

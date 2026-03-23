import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ImageService } from './image.service';

describe('ImageService', () => {
  let service: ImageService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(ImageService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send POST request with prompt', () => {
    let result: string | undefined;
    service.generateImage('test prompt').subscribe(url => {
      result = url;
    });

    const req = httpMock.expectOne(req => req.url.includes('generate-image') || req.url.includes('webhook'));
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ prompt: 'test prompt' });
    expect(req.request.responseType).toBe('blob');

    const blob = new Blob(['fake-image'], { type: 'image/png' });
    req.flush(blob);

    expect(result).toBeTruthy();
    expect(result!.startsWith('blob:')).toBeTrue();
  });

  it('should handle HTTP errors', () => {
    let errorCaught = false;
    service.generateImage('test').subscribe({
      error: (err) => {
        errorCaught = true;
        expect(err.status).toBe(500);
      },
    });

    const req = httpMock.expectOne(req => req.url.includes('generate-image') || req.url.includes('webhook'));
    req.flush(new Blob(['error']), { status: 500, statusText: 'Internal Server Error' });

    expect(errorCaught).toBeTrue();
  });

  it('should handle network errors', () => {
    let errorCaught = false;
    service.generateImage('test').subscribe({
      error: (err) => {
        errorCaught = true;
      },
    });

    const req = httpMock.expectOne(req => req.url.includes('generate-image') || req.url.includes('webhook'));
    req.error(new ProgressEvent('Network error'));

    expect(errorCaught).toBeTrue();
  });
});

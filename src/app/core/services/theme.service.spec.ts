import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should always be light mode (Forest DS)', () => {
    expect(service.isDarkMode()).toBeFalse();
  });

  it('should remain light mode after toggle (no-op)', () => {
    service.toggle();
    expect(service.isDarkMode()).toBeFalse();
  });
});

import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the app title', () => {
    expect(fixture.nativeElement.querySelector('h1')?.textContent).toContain('ImageGen Studio');
  });

  it('should use navbar class', () => {
    expect(fixture.nativeElement.querySelector('.navbar')).toBeTruthy();
  });

  it('should show DALL-E 3 badge', () => {
    expect(fixture.nativeElement.textContent).toContain('DALL-E 3');
  });
});

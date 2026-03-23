import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render author name', () => {
    expect(fixture.nativeElement.textContent).toContain('Samael Hernandez');
  });

  it('should have contentinfo role', () => {
    expect(fixture.nativeElement.querySelector('[role="contentinfo"]')).toBeTruthy();
  });
});

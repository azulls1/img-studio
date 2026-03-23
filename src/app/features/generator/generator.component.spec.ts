import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { GeneratorComponent } from './generator.component';

describe('GeneratorComponent', () => {
  let component: GeneratorComponent;
  let fixture: ComponentFixture<GeneratorComponent>;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [GeneratorComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(GeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty prompt initially', () => {
    expect(component.prompt()).toBe('');
  });

  it('should not be loading initially', () => {
    expect(component.loading()).toBeFalse();
  });

  it('should have no error initially', () => {
    expect(component.errorMessage()).toBeNull();
  });

  it('should render the prompt textarea', () => {
    expect(fixture.nativeElement.querySelector('#prompt-input')).toBeTruthy();
  });

  it('should render hero card', () => {
    expect(fixture.nativeElement.querySelector('.card-hero')).toBeTruthy();
  });

  it('should use Forest DS card class', () => {
    expect(fixture.nativeElement.querySelector('.card')).toBeTruthy();
  });

  it('should use Forest DS btn-cta class', () => {
    expect(fixture.nativeElement.querySelector('.btn-cta')).toBeTruthy();
  });

  it('should update prompt on input', () => {
    const textarea = fixture.nativeElement.querySelector('#prompt-input') as HTMLTextAreaElement;
    textarea.value = 'test prompt';
    textarea.dispatchEvent(new Event('input'));
    expect(component.prompt()).toBe('test prompt');
  });

  it('should show error when prompt is too short', () => {
    component.prompt.set('hi');
    component.onGenerate();
    expect(component.errorMessage()).toBe('El prompt debe tener al menos 5 caracteres.');
  });

  it('should use Forest DS alert-error class for errors', () => {
    component.errorMessage.set('test error');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.alert-error')).toBeTruthy();
  });

  it('should handle Ctrl+Enter to generate', () => {
    component.prompt.set('valid test prompt');
    const event = new KeyboardEvent('keydown', { key: 'Enter', ctrlKey: true });
    spyOn(event, 'preventDefault');
    component.onKeyDown(event);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(component.loading()).toBeTrue();
  });

  it('should not generate on Enter without Ctrl', () => {
    component.prompt.set('valid test prompt');
    const event = new KeyboardEvent('keydown', { key: 'Enter', ctrlKey: false });
    component.onKeyDown(event);
    expect(component.loading()).toBeFalse();
  });

  it('should show delete confirmation modal', () => {
    component.confirmDelete(0);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="dialog"]')).toBeTruthy();
  });

  it('should show loading dots when generating', () => {
    component.prompt.set('test prompt for image');
    component.loading.set(true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.loading-dots')).toBeTruthy();
  });

  it('should show empty state when no images', () => {
    expect(fixture.nativeElement.querySelector('.empty-state')).toBeTruthy();
  });
});

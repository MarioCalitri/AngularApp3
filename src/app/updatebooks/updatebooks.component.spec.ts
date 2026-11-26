import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdatebooksComponent } from './updatebooks.component';

// Test suite for UpdatebooksComponent
describe('UpdatebooksComponent', () => {
  // Instance of UpdatebooksComponent under test
  let component: UpdatebooksComponent;
  // Test fixture wrapping the component and its rendered template
  let fixture: ComponentFixture<UpdatebooksComponent>;

  // Configure and initialize the testing module before each test
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Import standalone UpdatebooksComponent directly
      imports: [UpdatebooksComponent]
    })
    .compileComponents();

    // Create the component fixture and grab the component instance
    fixture = TestBed.createComponent(UpdatebooksComponent);
    component = fixture.componentInstance;
    // Run initial change detection and lifecycle hooks
    fixture.detectChanges();
  });

  // Smoke test verifying the component instantiates properly
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
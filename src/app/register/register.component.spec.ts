import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';

// Test suite for RegisterComponent
describe('Register', () => {
  // Instance of the RegisterComponent under test
  let component: RegisterComponent;
  // Test fixture wrapping the component and its template/DOM
  let fixture: ComponentFixture<RegisterComponent>;

  // Runs before each test to configure and initialize the testing module
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Import standalone RegisterComponent since it isn't declared in an NgModule
      imports: [RegisterComponent],
    }).compileComponents();

    // Create the component fixture and grab the component instance
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;

    // Wait for initial async operations, bindings, and stability before running assertions
    await fixture.whenStable();
  });

  // Basic test verifying the component creates without throwing errors
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
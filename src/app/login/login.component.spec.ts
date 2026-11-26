import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

// Test suite for LoginComponent
describe('LoginComponent', () => {
  // Component instance under test
  let component: LoginComponent;
  // Test wrapper used to access the DOM and trigger change detection
  let fixture: ComponentFixture<LoginComponent>;

  // Runs before each test case to set up a clean testing environment
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Import standalone LoginComponent since it isn't declared in an NgModule
      imports: [LoginComponent]
    })
    .compileComponents();

    // Create the component fixture and grab the component instance
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    // Trigger initial data binding and lifecycle hooks (such as ngOnInit)
    fixture.detectChanges();
  });

  // Smoke test verifying the component instantiates without errors
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
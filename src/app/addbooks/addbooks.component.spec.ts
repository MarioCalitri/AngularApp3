import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddcontactsComponent } from './addbooks.component';

describe('Addcontacts', () => {
  let component: AddcontactsComponent;
  let fixture: ComponentFixture<AddcontactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddcontactsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddcontactsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

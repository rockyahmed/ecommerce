import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerLoginModalComponent } from './customer-login-modal.component';

describe('CustomerLoginModalComponent', () => {
  let component: CustomerLoginModalComponent;
  let fixture: ComponentFixture<CustomerLoginModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerLoginModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerLoginModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommerceAdminAppComponent } from './ecommerce-admin-app.component';

describe('EcommerceAdminAppComponent', () => {
  let component: EcommerceAdminAppComponent;
  let fixture: ComponentFixture<EcommerceAdminAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcommerceAdminAppComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EcommerceAdminAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

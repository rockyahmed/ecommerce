import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleSetupComponent } from './user-role-setup.component';

describe('UserRoleSetupComponent', () => {
  let component: UserRoleSetupComponent;
  let fixture: ComponentFixture<UserRoleSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRoleSetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserRoleSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

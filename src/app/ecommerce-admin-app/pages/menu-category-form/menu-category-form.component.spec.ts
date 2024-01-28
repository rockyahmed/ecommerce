import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCategoryFormComponent } from './menu-category-form.component';

describe('MenuCategoryFormComponent', () => {
  let component: MenuCategoryFormComponent;
  let fixture: ComponentFixture<MenuCategoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuCategoryFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuCategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

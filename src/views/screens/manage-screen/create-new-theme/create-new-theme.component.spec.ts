import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewThemeComponent } from './create-new-theme.component';

describe('CreateNewThemeComponent', () => {
  let component: CreateNewThemeComponent;
  let fixture: ComponentFixture<CreateNewThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewThemeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

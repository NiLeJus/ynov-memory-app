import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonQuitComponent } from './button-quit.component';

describe('ButtonQuitComponent', () => {
  let component: ButtonQuitComponent;
  let fixture: ComponentFixture<ButtonQuitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonQuitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonQuitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

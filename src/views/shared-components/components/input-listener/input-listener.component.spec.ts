import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputListenerComponent } from './input-listener.component';

describe('InputListenerComponent', () => {
  let component: InputListenerComponent;
  let fixture: ComponentFixture<InputListenerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputListenerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputListenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDispComponent } from './modal-disp.component';

describe('ModalDispComponent', () => {
  let component: ModalDispComponent;
  let fixture: ComponentFixture<ModalDispComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDispComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDispComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

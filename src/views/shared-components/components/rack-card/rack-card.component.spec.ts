import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RackCardComponent } from './rack-card.component';

describe('RackCardComponent', () => {
  let component: RackCardComponent;
  let fixture: ComponentFixture<RackCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RackCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RackCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorHasRunComponent } from './indicator-has-run.component';

describe('IndicatorHasRunComponent', () => {
  let component: IndicatorHasRunComponent;
  let fixture: ComponentFixture<IndicatorHasRunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndicatorHasRunComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndicatorHasRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

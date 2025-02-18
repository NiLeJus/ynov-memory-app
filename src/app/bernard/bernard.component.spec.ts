import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BernardComponent } from './bernard.component';

describe('BernardComponent', () => {
  let component: BernardComponent;
  let fixture: ComponentFixture<BernardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BernardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BernardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

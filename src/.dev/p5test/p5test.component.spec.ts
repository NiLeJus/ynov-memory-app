import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P5testComponent } from './p5test.component';

describe('P5testComponent', () => {
  let component: P5testComponent;
  let fixture: ComponentFixture<P5testComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [P5testComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(P5testComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

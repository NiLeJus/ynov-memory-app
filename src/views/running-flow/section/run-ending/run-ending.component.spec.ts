import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunEndingComponent } from './run-ending.component';

describe('RunEndingComponent', () => {
  let component: RunEndingComponent;
  let fixture: ComponentFixture<RunEndingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RunEndingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RunEndingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

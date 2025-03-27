import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunFiltersComponent } from './run-filters.component';

describe('RunFiltersComponent', () => {
  let component: RunFiltersComponent;
  let fixture: ComponentFixture<RunFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RunFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RunFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

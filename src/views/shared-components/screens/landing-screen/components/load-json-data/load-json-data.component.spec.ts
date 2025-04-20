import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadJsonDataComponent } from './load-json-data.component';

describe('LoadJsonDataComponent', () => {
  let component: LoadJsonDataComponent;
  let fixture: ComponentFixture<LoadJsonDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadJsonDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadJsonDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

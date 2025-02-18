import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryCardSmComponent } from './memory-card-sm.component';

describe('MemoryCardSmComponent', () => {
  let component: MemoryCardSmComponent;
  let fixture: ComponentFixture<MemoryCardSmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemoryCardSmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemoryCardSmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

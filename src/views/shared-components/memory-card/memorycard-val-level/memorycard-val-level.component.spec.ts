import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemorycardValLevelComponent } from './memorycard-val-level-val.component';

describe('MemorycardLevelValComponent', () => {
  let component: MemorycardValLevelComponent;
  let fixture: ComponentFixture<MemorycardValLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemorycardValLevelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MemorycardValLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

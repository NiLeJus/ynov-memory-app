import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemorycardTabComponent } from './memorycard-tab.component';

describe('MemorycardTabComponent', () => {
  let component: MemorycardTabComponent;
  let fixture: ComponentFixture<MemorycardTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemorycardTabComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MemorycardTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

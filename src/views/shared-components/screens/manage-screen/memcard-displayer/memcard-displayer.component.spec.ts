import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemcardDisplayerComponent } from './memcard-displayer.component';

describe('MemcardDisplayerComponent', () => {
  let component: MemcardDisplayerComponent;
  let fixture: ComponentFixture<MemcardDisplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemcardDisplayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemcardDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

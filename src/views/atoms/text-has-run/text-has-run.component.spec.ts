import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextHasRunComponent } from './text-has-run.component';

describe('TextHasRunComponent', () => {
  let component: TextHasRunComponent;
  let fixture: ComponentFixture<TextHasRunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextHasRunComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextHasRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

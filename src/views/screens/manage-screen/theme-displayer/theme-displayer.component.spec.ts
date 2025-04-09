import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeDisplayerComponent } from './theme-displayer.component';

describe('ThemeDisplayerComponent', () => {
  let component: ThemeDisplayerComponent;
  let fixture: ComponentFixture<ThemeDisplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeDisplayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemeDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

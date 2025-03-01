import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemesDisplayerComponent } from './themes-displayer.component';

describe('ThemesDisplayerComponent', () => {
  let component: ThemesDisplayerComponent;
  let fixture: ComponentFixture<ThemesDisplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemesDisplayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemesDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

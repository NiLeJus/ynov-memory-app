import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RunPreviewSectionComponent } from './run-preview.section.component';

describe('RunPreviewSectionComponent', () => {
  let component: RunPreviewSectionComponent;
  let fixture: ComponentFixture<RunPreviewSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RunPreviewSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RunPreviewSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

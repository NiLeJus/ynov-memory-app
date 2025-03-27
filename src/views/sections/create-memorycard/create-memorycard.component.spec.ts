import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMemorycardComponent } from './create-memorycard.component';

describe('CreateMemorycardComponent', () => {
  let component: CreateMemorycardComponent;
  let fixture: ComponentFixture<CreateMemorycardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateMemorycardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMemorycardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

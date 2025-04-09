import { TestBed } from '@angular/core/testing';

import { InputModDetectorService } from './input-mod-detector.service';

describe('InputModDetectorService', () => {
  let service: InputModDetectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputModDetectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

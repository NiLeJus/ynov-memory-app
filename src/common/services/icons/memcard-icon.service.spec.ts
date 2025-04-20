import { TestBed } from '@angular/core/testing';

import { MemcardIconService } from './memcard-icon.service';

describe('MemcardIconService', () => {
  let service: MemcardIconService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemcardIconService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

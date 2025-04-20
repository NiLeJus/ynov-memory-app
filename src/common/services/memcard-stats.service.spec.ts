import { TestBed } from '@angular/core/testing';

import { MemcardStatsService } from './memcard-stats.service';

describe('MemcardStatsService', () => {
  let service: MemcardStatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemcardStatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

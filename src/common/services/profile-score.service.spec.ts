import { TestBed } from '@angular/core/testing';

import { ProfileScoreService } from './profile-score.service';

describe('ProfileScoreService', () => {
  let service: ProfileScoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileScoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

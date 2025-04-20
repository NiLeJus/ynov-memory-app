import { TestBed } from '@angular/core/testing';

import { ProfileExportService } from './profile-export.service';

describe('ProfileExportService', () => {
  let service: ProfileExportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileExportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

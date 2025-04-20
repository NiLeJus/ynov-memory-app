import { TestBed } from '@angular/core/testing';

import { ProfileImportService } from './profile-import.service';

describe('ProfileImportService', () => {
  let service: ProfileImportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileImportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

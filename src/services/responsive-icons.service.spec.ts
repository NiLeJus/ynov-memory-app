import { TestBed } from '@angular/core/testing';

import { ResponsiveIconsService } from './responsive-icons.service';

describe('ResponsiveIconsService', () => {
  let service: ResponsiveIconsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponsiveIconsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { StoreGlobalService } from './store-global.service';

describe('StoreGlobalService', () => {
  let service: StoreGlobalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreGlobalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { MockerService } from './mocker.service';

describe('MockerService', () => {
  let service: MockerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ManageContentService } from './manage-content.service';

describe('ManageContentService', () => {
  let service: ManageContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

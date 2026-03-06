import { TestBed } from '@angular/core/testing';

import { DescriptionTreeSearchService } from './description-tree-search.service';

describe('DescriptionTreeSearchService', () => {
  let service: DescriptionTreeSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DescriptionTreeSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

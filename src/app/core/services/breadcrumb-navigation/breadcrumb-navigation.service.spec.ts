import { TestBed } from '@angular/core/testing';

import { BreadcrumbNavigationService } from './breadcrumb-navigation.service';

describe('BreadcrumbNavigationService', () => {
  let service: BreadcrumbNavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreadcrumbNavigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

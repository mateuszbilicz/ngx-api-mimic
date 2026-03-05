import { TestBed } from '@angular/core/testing';

import { ConsoleReaderService } from './console-reader.service';

describe('ConsoleReaderService', () => {
  let service: ConsoleReaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsoleReaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { PsyDictionaryService } from './psy-dictionary.service';

describe('PsyDictionaryService', () => {
  let service: PsyDictionaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PsyDictionaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

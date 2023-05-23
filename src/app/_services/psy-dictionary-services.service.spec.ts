import { TestBed } from '@angular/core/testing';

import { PsyDictionaryServicesService } from './psy-dictionary-services.service';

describe('PsyDictionaryServicesService', () => {
  let service: PsyDictionaryServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PsyDictionaryServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

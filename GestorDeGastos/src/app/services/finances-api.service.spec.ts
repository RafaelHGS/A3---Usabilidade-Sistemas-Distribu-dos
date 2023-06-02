import { TestBed } from '@angular/core/testing';

import { FinancesAPIService } from './finances-api.service';

describe('FinancesAPIService', () => {
  let service: FinancesAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancesAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

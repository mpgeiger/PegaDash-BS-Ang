import { TestBed } from '@angular/core/testing';

import { GetAccountSummaryService } from './getaccountsummary.service';

describe('GetAccountSummaryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetAccountSummaryService = TestBed.get(GetAccountSummaryService);
    expect(service).toBeTruthy();
  });
});

import { TestBed, inject } from '@angular/core/testing';

import { PegaSessionService } from './accountlist.service';

describe('PegaSessionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PegaSessionService]
    });
  });

  it('should be created', inject([PegaSessionService], (service: PegaSessionService) => {
    expect(service).toBeTruthy();
  }));
});

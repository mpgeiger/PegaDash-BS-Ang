import { TestBed } from '@angular/core/testing';

import { SharedPegaDataService } from './sharedpegadata.service';

describe('SharedPegaData.ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedPegaDataService = TestBed.get(SharedPegaDataService);
    expect(service).toBeTruthy();
  });
});

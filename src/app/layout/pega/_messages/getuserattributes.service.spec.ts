import { TestBed } from '@angular/core/testing';

import { GetUserAttributesService } from './getuserattributes.service';

describe('GetUserAttributesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetUserAttributesService = TestBed.get(GetUserAttributesService);
    expect(service).toBeTruthy();
  });
});

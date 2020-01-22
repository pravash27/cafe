import { TestBed } from '@angular/core/testing';

import { UnitServiceService } from './unit-service.service';

describe('UnitServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnitServiceService = TestBed.get(UnitServiceService);
    expect(service).toBeTruthy();
  });
});

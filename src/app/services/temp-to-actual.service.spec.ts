import { TestBed } from '@angular/core/testing';

import { TempToActualService } from './temp-to-actual.service';

describe('TempToActualService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TempToActualService = TestBed.get(TempToActualService);
    expect(service).toBeTruthy();
  });
});

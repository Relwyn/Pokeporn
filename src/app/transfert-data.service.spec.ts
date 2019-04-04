import { TestBed } from '@angular/core/testing';

import { TransfertDataService } from './transfert-data.service';

describe('TransfertDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransfertDataService = TestBed.get(TransfertDataService);
    expect(service).toBeTruthy();
  });
});

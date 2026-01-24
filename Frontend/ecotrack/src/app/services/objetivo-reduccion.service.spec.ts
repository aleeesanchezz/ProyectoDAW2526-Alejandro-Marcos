import { TestBed } from '@angular/core/testing';

import { ObjetivoReduccionService } from './objetivo-reduccion.service';

describe('ObjetivoReduccionService', () => {
  let service: ObjetivoReduccionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjetivoReduccionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

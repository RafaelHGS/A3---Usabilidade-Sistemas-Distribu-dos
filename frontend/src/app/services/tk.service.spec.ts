import { TestBed } from '@angular/core/testing';

import { TkService } from './tk.service';

describe('TkService', () => {
  let service: TkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

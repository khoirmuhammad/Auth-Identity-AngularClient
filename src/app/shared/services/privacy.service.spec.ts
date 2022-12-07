/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PrivacyService } from './privacy.service';

describe('Service: Privacy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrivacyService]
    });
  });

  it('should ...', inject([PrivacyService], (service: PrivacyService) => {
    expect(service).toBeTruthy();
  }));
});

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StripeScriptService } from './stripe-script.service';

describe('Service: StripeScript', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StripeScriptService]
    });
  });

  it('should ...', inject([StripeScriptService], (service: StripeScriptService) => {
    expect(service).toBeTruthy();
  }));
});

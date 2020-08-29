/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ScriptLoadingService } from './script-loading.service';

describe('Service: ScriptLoading', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScriptLoadingService]
    });
  });

  it('should ...', inject([ScriptLoadingService], (service: ScriptLoadingService) => {
    expect(service).toBeTruthy();
  }));
});

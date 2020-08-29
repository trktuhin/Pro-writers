import { Injectable } from '@angular/core';
import { ScriptLoadingService } from './script-loading.service';

@Injectable({
  providedIn: 'root'
})
export class StripeScriptService {

  private baseUrl = 'https://js.stripe.com/v3/';
  private globalVar = 'stripe';

  constructor(private scriptLoadingService: ScriptLoadingService) {}

  registerScript(loaded: () => void): void {
    this.scriptLoadingService.registerScript(this.getStripeUrl(), this.globalVar, loaded);
  }

  getStripeUrl(): string {
    return this.baseUrl;
  }

}

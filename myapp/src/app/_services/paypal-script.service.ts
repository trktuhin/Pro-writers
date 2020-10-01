import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PayPalConfig } from '../_models/payPalConfig';
import { ScriptLoadingService } from './script-loading.service';

@Injectable({
  providedIn: 'root'
})
export class PaypalScriptService {
  private baseUrl = 'https://www.paypal.com/sdk/js';
  private globalVar = 'paypal';

  constructor(
    private scriptLoadingService: ScriptLoadingService,
  ) { }

  registerScript(configuration: PayPalConfig, loaded: (payPalApi: any) => void): void {
    this.scriptLoadingService.registerScript(this.getPayPalUrl(configuration), this.globalVar, loaded);
  }

  getPayPalUrl(configuration: PayPalConfig): string {
    let url = `${this.baseUrl}?client-id=${environment.payment.paypal.clientId
      }`;
    if (configuration.components) {
      url += `&components=${configuration.components.join(',')}`;
    }

    if (configuration.currency) {
      url += `&currency=${configuration.currency}`;
    }
    return url;
  }
}

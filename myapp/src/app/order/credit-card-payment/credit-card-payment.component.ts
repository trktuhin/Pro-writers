import { Component, OnInit, OnDestroy } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StripeScriptService } from 'src/app/_services/stripe-script.service';
import { environment } from 'src/environments/environment';
import { OrderDetails } from 'src/app/_models/orderDetails';
import { LoadingController } from '@ionic/angular';
declare var Stripe: any;
@Component({
  selector: 'app-credit-card-payment',
  templateUrl: './credit-card-payment.component.html',
  styleUrls: ['./credit-card-payment.component.scss']
})
export class CreditCardPaymentComponent implements OnInit, OnDestroy {
  params: Params;
  callbackWindow: any;
  currentOrder: OrderDetails;
  price: number;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private stripeScriptService: StripeScriptService,
    private loadingCtrl: LoadingController
  ) {
    this.receiveMessage = this.receiveMessage.bind(this);
    this.route.queryParams.subscribe((params: Params) => {
      if (params.session_id) {
        this.params = params;
      }
      if (params.price) {
        this.price = +params.price;
      }
    });
  }

  ngOnInit() {
    this.loadingCtrl.create({
      spinner: 'bubbles',
      message: 'PLease wait ...'
    }).then(el => el.present());

    window.addEventListener('message', this.receiveMessage, false);
    this.stripeScriptService.registerScript(() => {
      this.http
        .post(
          environment.baseServer + 'stripe/session',
          [
            {
              name: 'Pro-Writers',
              description: 'Pay the amount and get your own book',
              price: this.price,
              currency: 'usd',
              quantity: 1
            }
          ]
        )
        .subscribe((result: any) => {
          console.log('request sent');
          const stripe = Stripe(environment.payment.stripe.publishableKey);
          stripe
            .redirectToCheckout({
              sessionId: result.sessionId
            })
            .then(function(result) {
              // this happens when 'redirectToCheckout' fails
              this.close({ success: false, message: result.error.message });
            });
        });
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener('message', this.receiveMessage, false);
  }


  receiveMessage(event): void {
    // if (event.origin !== environment.baseDomain || !event.data.stripe) { return; }
    this.callbackWindow = event.source;
    if (this.params && event.data.stripe.subscribe) {
      this.close(this.params);
    }
  }
  private close(result: any): void {
    this.callbackWindow.postMessage(result, environment.baseDomain);
    window.close();
  }
}

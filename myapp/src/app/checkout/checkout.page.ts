import { Component, OnInit, OnDestroy, NgZone, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../_services/order.service';
import { OrderDetails } from '../_models/orderDetails';
import { StripeScriptService } from '../_services/stripe-script.service';
import { environment } from 'src/environments/environment';
import { ToastController, LoadingController } from '@ionic/angular';
import { CouponService } from '../_services/coupon.service';
import { PayPalConfig } from '../_models/payPalConfig';
import { PaypalScriptService } from '../_services/paypal-script.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit, OnDestroy {
  discount = 0;
  couponValue = '';
  currentOrder: OrderDetails;
  card: any;
  result: any;
  stripe: any;
  elements: any;
  timeout: any;
  public payPalConfig?: IPayPalConfig;
  // for paypal payment
  // payPalButtonId = 'payPalButton';
  // private payPalLoaded: boolean;
  // private paypalConfiguration: PayPalConfig = {
  //   components: ['buttons', 'funding-eligibility'],
  //   currency: 'USD'
  // };

  private stripeLoaded: boolean;
  constructor(private router: Router,
              private orderService: OrderService,
              private toastCtrl: ToastController,
              private stripeScriptService: StripeScriptService,
              private couponService: CouponService,
              private loadingCtrl: LoadingController,
              private paypalScriptService: PaypalScriptService,
              private ngZone: NgZone) { }

  ngOnInit() {
    // window.addEventListener('message', this.receiveMessage, false);
    this.initConfig();
  }

  ngOnDestroy(): void {
    window.addEventListener('message', this.receiveMessage, false);
    this.clearInterval();
  }
  receiveMessage(event) {
    console.log('Transaction completed ' + JSON.stringify(event.data));
    this.clearInterval();
    if (event.data) {
      window.location.href = 'http://localhost:4200/home?paymentConfirmation=success';
    }
  }
  private clearInterval(): void {
    if (this.timeout) {
      clearInterval(this.timeout);
    }
  }
  ionViewWillEnter() {
    this.currentOrder = this.orderService.getCurrentOrder();
    if (this.currentOrder == null) {
      this.router.navigate(['order']);
    }
  }

  getTotalPrice() {
    let bookPrice = (+this.currentOrder.noOfWord / 1000) * 15;
    if (this.currentOrder.customizedCopyrightPage) {
      bookPrice += 10;
    }
    if (this.currentOrder.plagiarismReport) {
      bookPrice += 15;
    }
    return bookPrice;
  }

  getSubTotalPrice() {
    let bookPrice = (+this.currentOrder.noOfWord / 1000) * 15;
    if (this.currentOrder.customizedCopyrightPage) {
      bookPrice += 10;
    }
    if (this.currentOrder.plagiarismReport) {
      bookPrice += 15;
    }
    bookPrice -= this.discount;
    return bookPrice;
  }

  checkout(): void {
    const popup = window.open(environment.baseDomain + 'card?price=' + this.getSubTotalPrice(),
      '_blank', 'location=yes,width=800,height=600');
    popup.addEventListener(
      'load',
      () => {
        popup.postMessage({ stripe: true }, environment.baseDomain);
      },
      false
    );
    // adding order to server
    this.addOrderToServer();

    this.timeout = setInterval(() => {
      popup.postMessage({ stripe: { subscribe: true } }, environment.baseDomain);
    }, 1000);
  }

  addOrderToServer() {
    // this.currentOrder.totalDiscount = this.discount;
    const model = new FormData();
    model.append('bookTitle', this.currentOrder.bookTitle);
    model.append('subTitle', this.currentOrder.subTitle);
    model.append('authorName', this.currentOrder.authorName);
    model.append('projectDescription', this.currentOrder.projectDescription);
    model.append('noOfWord', JSON.stringify(this.currentOrder.noOfWord));
    model.append('clientName', this.currentOrder.clientName);
    model.append('clientEmail', this.currentOrder.clientEmail);
    model.append('customizedCopyrightPage', JSON.stringify(this.currentOrder.customizedCopyrightPage));
    model.append('professionalBookDescription', JSON.stringify(this.currentOrder.professionalBookDescription));
    model.append('plagiarismReport', JSON.stringify(this.currentOrder.plagiarismReport));
    model.append('wordFormatting', JSON.stringify(this.currentOrder.wordFormatting));
    model.append('totalDiscount', JSON.stringify(this.discount));
    model.append('docFile', this.currentOrder.docFile);

    console.log('add order method invoked');
    this.orderService.addOrder(model).subscribe(res => {
      localStorage.setItem('currentOrderId', res as string);
    }, err => console.log(err));
  }

  applyCoupon() {
    if (this.couponValue === '') {
      this.showErrorMessage('Please enter your coupon first !');
    }
    this.loadingCtrl.create({
      spinner: 'bubbles',
      message: 'Checking ....'
    }).then(el => {
      el.present();
      this.couponService.applyCoupon(this.couponValue).subscribe((res: any) => {
        const discountPercent = +res.discountPercent;
        this.calculateDiscount(discountPercent);
        this.initConfig();
      }, err => {
        this.discount = 0;
        this.showErrorMessage('Invalid coupon !');
        this.initConfig();
      });
      this.loadingCtrl.dismiss();
    });
  }
  showErrorMessage(errMessage: string) {
    this.toastCtrl.create({
      message: errMessage,
      duration: 3000,
      position: 'top',
      color: 'danger'
    }).then(el => el.present());
  }
  calculateDiscount(discountPercent: number) {
    const currentBasePrice = +this.currentOrder.noOfWord / 1000 * 15;
    this.discount = Math.ceil((currentBasePrice * discountPercent) / 100);
  }

  private initConfig(): void {
    this.payPalConfig = {
        currency: 'USD',
        clientId: 'AQJjp9iW2OZQZKTcUbilTt8bizVvT-yErn4WO42zA6HganQ8cbWH05-wNrxsOubdtXDqdVHNatV2eptm',
        createOrderOnClient: (data) => <ICreateOrderRequest> {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: this.getSubTotalPrice().toString(),
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: this.getSubTotalPrice().toString()
                        }
                    }
                },
                items: [{
                    name: 'Book writing service',
                    quantity: '1',
                    category: 'DIGITAL_GOODS',
                    unit_amount: {
                        currency_code: 'USD',
                        value: this.getSubTotalPrice().toString(),
                    },
                }]
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'checkout',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then(details => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });
        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            // this.showSuccess = true;
            window.location.href = 'http://localhost:4200/home?paymentConfirmation=success';
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
            // this.showCancel = true;

        },
        onError: err => {
            console.log('OnError', err);
            // this.showError = true;
        },
        onClick: (data, actions) => {
          this.addOrderToServer();
          console.log('onClick', data, actions);
          // this.resetStatus();
        },
    };
}
}

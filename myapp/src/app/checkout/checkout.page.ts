import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../_services/order.service';
import { OrderDetails } from '../_models/orderDetails';
import { StripeScriptService } from '../_services/stripe-script.service';
import { environment } from 'src/environments/environment';
import { ToastController, LoadingController } from '@ionic/angular';
import { CouponService } from '../_services/coupon.service';

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
  private stripeLoaded: boolean;
  constructor(private router: Router,
              private orderService: OrderService,
              private toastCtrl: ToastController,
              private stripeScriptService: StripeScriptService,
              private couponService: CouponService,
              private loadingCtrl: LoadingController) { }

  ngOnInit() {
    window.addEventListener('message', this.receiveMessage, false);
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
    this.currentOrder.totalDiscount = this.discount;
    this.orderService.addOrder(this.currentOrder).subscribe(res => {
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
      }, err => {
        this.discount = 0;
        this.showErrorMessage('Invalid coupon !');
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
}

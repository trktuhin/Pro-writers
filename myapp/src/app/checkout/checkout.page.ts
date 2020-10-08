import { Component, OnInit, OnDestroy, NgZone, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../_services/order.service';
import { OrderDetails } from '../_models/orderDetails';
import { ToastController, LoadingController } from '@ionic/angular';
import { CouponService } from '../_services/coupon.service';
import { PaypalScriptService } from '../_services/paypal-script.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit{
  discount = 0;
  couponValue = '';
  currentOrder: OrderDetails;
  card: any;
  result: any;
  stripe: any;
  elements: any;
  timeout: any;
  public payPalConfig?: IPayPalConfig;

  private stripeLoaded: boolean;
  constructor(private router: Router,
              private orderService: OrderService,
              private toastCtrl: ToastController,
              private couponService: CouponService,
              private loadingCtrl: LoadingController,
              private title: Title,
              private meta: Meta){}
  ngOnInit() {
    // window.addEventListener('message', this.receiveMessage, false);
  }
  ionViewWillEnter() {
    this.title.setTitle('Checkout | Writogen');
    this.meta.updateTag({
      name: 'description',
      content: `the checkout page for writogen
      `
    });
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

    // console.log('add order method invoked');
    this.orderService.addOrder(model).subscribe(res => {
      // localStorage.setItem('currentOrderId', res as string);
      this.showSuccessMessage('We received your order, will send you email very soon');
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
  showSuccessMessage(errMessage: string) {
    this.toastCtrl.create({
      message: errMessage,
      duration: 3000,
      position: 'top',
      color: 'success'
    }).then(el => el.present());
  }
  calculateDiscount(discountPercent: number) {
    const currentBasePrice = +this.currentOrder.noOfWord / 1000 * 15;
    this.discount = Math.ceil((currentBasePrice * discountPercent) / 100);
  }
}

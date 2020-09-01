import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../_services/order.service';
import { OrderDetails } from '../_models/orderDetails';
import { StripeScriptService } from '../_services/stripe-script.service';
import { environment } from 'src/environments/environment';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit, OnDestroy {
  discount = 0;
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
              private stripeScriptService: StripeScriptService) { }

  ngOnInit() {
    window.addEventListener('message', this.receiveMessage, false);
  }
  ngOnDestroy(): void {
    window.addEventListener('message', this.receiveMessage, false);
    this.clearInterval();
  }
  // showPaymentConfirmation() {
  //   this.toastCtrl.create({
  //     message: 'We received your payment and will update you about your project',
  //     duration: 3000,
  //     position: 'top',
  //     cssClass: 'success'
  //   }).then(el => el.present);
  // }
  receiveMessage(event) {
    // if (event.origin !== environment.baseDomain) { return; }
    // confirm payment
    // this.showPaymentConfirmation();
    console.log('Transaction completed ' + JSON.stringify(event.data));
    this.clearInterval();
    window.location.href = 'http://localhost:4200/home?paymentConfirmation=success';
    // this.orderService.confirmPayment(this.currentOrderId).subscribe(res => {
    //   this.router.navigate(['home']);
    // }, err => console.log(err));
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
    this.orderService.addOrder(this.currentOrder).subscribe(res => {
      localStorage.setItem('currentOrderId', res as string);
    }, err => console.log(err));
  }
}

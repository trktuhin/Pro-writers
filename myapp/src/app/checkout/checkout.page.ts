import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../_services/order.service';
import { OrderDetails } from '../_models/orderDetails';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  discount = 0;
  currentOrder: OrderDetails;
  constructor(private router: Router, private orderService: OrderService) { }

  ngOnInit() {
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

}

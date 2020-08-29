import { Injectable } from '@angular/core';
import { OrderDetails } from '../_models/orderDetails';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  currentOrder: OrderDetails = undefined;

  constructor() { }

  saveOrder(order: OrderDetails) {
    this.currentOrder = order;
  }
  getCurrentOrder() {
    return this.currentOrder;
  }
}

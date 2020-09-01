import { Injectable } from '@angular/core';
import { OrderDetails } from '../_models/orderDetails';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  currentOrder: OrderDetails = undefined;
  baseUrl = environment.baseServer + 'Order/';

  constructor(private http: HttpClient) { }

  saveOrder(order: OrderDetails) {
    this.currentOrder = order;
  }
  getCurrentOrder() {
    return this.currentOrder;
  }
  addOrder(order: OrderDetails){
    return this.http.post(this.baseUrl + 'AddOrder', order);
  }
  confirmPayment(id: number) {
    return this.http.get(this.baseUrl + 'PaymentConfirmation/' + id);
  }
}

import { Injectable } from '@angular/core';
import { OrderDetails } from '../_models/orderDetails';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../_models/Pagination';
import { map } from 'rxjs/operators';

const tokenHeader = new HttpHeaders({
  Authorization: 'Bearer ' + localStorage.getItem('token')
});

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  currentOrder: OrderDetails = undefined;
  baseUrl = environment.baseServer + 'Order/';

  constructor(private http: HttpClient) { }

  saveOrder(order: OrderDetails) {
    this.currentOrder = order;
    console.log(this.currentOrder);
  }
  getCurrentOrder() {
    return this.currentOrder;
  }
  addOrder(order: FormData){
    return this.http.post(this.baseUrl + 'AddOrder', order);
  }
  confirmPayment(id: number) {
    return this.http.get(this.baseUrl + 'PaymentConfirmation/' + id, {headers: tokenHeader});
  }
  getAllOrder(orderParams) {
    const tknHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token')
    });
    const paginatedResult: PaginatedResult<OrderDetails[]> = new PaginatedResult<OrderDetails[]>();
    return this.http.post(this.baseUrl + 'GetAllOrders', orderParams, {
      observe: 'response',
      headers: tknHeader
    }).pipe(
      map((res: any) => {
        paginatedResult.result = res.body;
        if (res.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(res.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
  }

  deleteOrder(id: number) {
    return this.http.delete(this.baseUrl + 'deleteOrder/' + id, {headers: tokenHeader});
  }
  markAsComplete(id: number) {
    return this.http.get(this.baseUrl + 'markAsComplete/' + id, {headers: tokenHeader});
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  baseUrl = environment.baseServer + 'coupon/';
  constructor(private http: HttpClient) { }

  applyCoupon(couponValue: string) {
    return this.http.get(this.baseUrl + 'ApplyCoupon/' + couponValue);
  }
}

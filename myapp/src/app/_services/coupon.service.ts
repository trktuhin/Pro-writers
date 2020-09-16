import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CouponDetails } from '../_models/couponDetails';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  baseUrl = environment.baseServer + 'coupon/';
  currentCoupon: CouponDetails;
  constructor(private http: HttpClient) { }

  applyCoupon(couponValue: string) {
    return this.http.get(this.baseUrl + 'ApplyCoupon/' + couponValue);
  }
  addCoupon(coupon: CouponDetails) {
    return this.http.post(this.baseUrl + 'AddCoupon', coupon);
  }
  deletecoupon(couponId: number) {
    return this.http.delete(this.baseUrl + 'deleteCoupon/' + couponId);
  }
  getAllCoupons() {
    return this.http.get(this.baseUrl + 'GetAllCoupons');
  }
  updateCoupon(coupon: CouponDetails) {
    return this.http.post(this.baseUrl + 'updateCoupon', coupon);
  }
  saveCoupon(coupon: CouponDetails) {
    this.currentCoupon = coupon;
  }
  getCurrentCoupon() {
    return this.currentCoupon;
  }
}

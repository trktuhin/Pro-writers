import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CouponDetails } from '../_models/couponDetails';
const tokenHeader = new HttpHeaders({
  Authorization: 'Bearer ' + localStorage.getItem('token')
});

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
    return this.http.post(this.baseUrl + 'AddCoupon', coupon, {headers: tokenHeader});
  }
  deletecoupon(couponId: number) {
    return this.http.delete(this.baseUrl + 'deleteCoupon/' + couponId, {headers: tokenHeader});
  }
  getAllCoupons() {
    return this.http.get(this.baseUrl + 'GetAllCoupons', {headers: tokenHeader});
  }
  updateCoupon(coupon: CouponDetails) {
    return this.http.post(this.baseUrl + 'updateCoupon', coupon, {headers: tokenHeader});
  }
  saveCoupon(coupon: CouponDetails) {
    this.currentCoupon = coupon;
  }
  getCurrentCoupon() {
    return this.currentCoupon;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CouponDetails } from '../_models/couponDetails';
// const tokenHeader = new HttpHeaders({
//   Authorization: 'Bearer ' + localStorage.getItem('token')
// });

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
    const tknHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.post(this.baseUrl + 'AddCoupon', coupon, {headers: tknHeader});
  }
  deletecoupon(couponId: number) {
    const tknHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.delete(this.baseUrl + 'deleteCoupon/' + couponId, {headers: tknHeader});
  }
  getAllCoupons() {
    const tknHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get(this.baseUrl + 'GetAllCoupons', {headers: tknHeader});
  }
  updateCoupon(coupon: CouponDetails) {
    const tknHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.post(this.baseUrl + 'updateCoupon', coupon, {headers: tknHeader});
  }
  saveCoupon(coupon: CouponDetails) {
    this.currentCoupon = coupon;
  }
  getCurrentCoupon() {
    return this.currentCoupon;
  }
}

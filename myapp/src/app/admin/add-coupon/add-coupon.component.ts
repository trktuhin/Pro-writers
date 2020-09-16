import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CouponDetails } from 'src/app/_models/couponDetails';
import { CouponService } from 'src/app/_services/coupon.service';

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.scss'],
})
export class AddCouponComponent implements OnInit {
  @Input() mode: string;
  currentCoupon: CouponDetails;
  constructor(private couponService: CouponService, private modalCtrl: ModalController) { }

  ngOnInit() {
    if (this.mode === 'edit') {
      this.currentCoupon = this.couponService.getCurrentCoupon();
    }
    else {
      this.currentCoupon = {
        id: 0,
        couponValue: '',
        discountPercent: 0
      };
    }
  }
  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  SaveUpdateCoupon() {
    if (this.mode === 'edit') {
      this.couponService.updateCoupon(this.currentCoupon).subscribe(res => {
        this.modalCtrl.dismiss(null, 'success');
      }, err => {
        console.log(err);
        this.modalCtrl.dismiss(null, 'cancel');
      });
    }
    else {
      this.couponService.addCoupon(this.currentCoupon).subscribe(res => {
        this.modalCtrl.dismiss(null, 'success');
      }, err => {
        console.log(err);
        this.modalCtrl.dismiss(null, 'cancel');
      });
    }
  }

}

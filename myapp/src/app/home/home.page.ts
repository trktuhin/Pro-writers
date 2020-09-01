import { Component, OnInit } from '@angular/core';
import { OrderService } from '../_services/order.service';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private orderService: OrderService, private toastCtrl: ToastController,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.paymentConfirmation) {
        const currentOrderId = +localStorage.getItem('currentOrderId');
        this.orderService.confirmPayment(currentOrderId).subscribe(res => {
          this.showSuccessMessage();
        }, err => console.log(err));
      }
    });
  }
  showSuccessMessage() {
    this.toastCtrl.create({
      message: 'Thanks ! We received your payment and will update you about your project',
      duration: 3000,
      position: 'top',
      color: 'success'
    }).then(el => el.present());
  }
}

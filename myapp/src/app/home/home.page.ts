import { Component, OnInit } from '@angular/core';
import { OrderService } from '../_services/order.service';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private orderService: OrderService, private toastCtrl: ToastController,
              private route: ActivatedRoute,
              private router: Router,
              private title: Title,
              private meta: Meta) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.paymentConfirmation) {
        const currentOrderId = +localStorage.getItem('currentOrderId');
        if (currentOrderId === 0) {
          return;
        }
        this.orderService.confirmPayment(currentOrderId).subscribe(res => {
          this.showSuccessMessage();
          localStorage.removeItem('currentOrderId');
        }, err => console.log(err));
      }
    });
  }

  ionViewWillEnter() {
    this.title.setTitle('Home | Writogen');
    this.meta.updateTag({
      name: 'description',
      content: `home page or dashboard of writogen, a ghost e-book writing company. the best ghost writing service
      provided worldwide. Most expert ghost writers work here. Successful self publisher's choice.
      `
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

  goToOrder() {
    this.router.navigate(['order']);
  }

  goToContact() {
    this.router.navigate(['contact']);
  }

  goToServices() {
    this.router.navigate(['services']);
  }
}

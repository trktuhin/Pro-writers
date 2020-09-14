import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/_services/order.service';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { OrderDetails } from 'src/app/_models/orderDetails';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { DetailedOrderComponent } from '../detailed-order/detailed-order.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  orderPagination: Pagination;
  orders: OrderDetails[] = [];
  currentSegment = 'orders';
  bookTitleSearch = '';
  isPaymentReceivedSearch = true;
  isPaymentDropdownValue = 'yes';
  isCompletedDropdownValue = 'no';
  isCompletedSearch = false;
  constructor(private orderService: OrderService,
              private loadingCtrl: LoadingController,
              private modalCtrl: ModalController,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadingCtrl.create({
      spinner: 'bubbles',
      message: 'please wait...'
    }).then(el =>{
      el.present();
      this.loadOrders();
      el.dismiss();
    });
  }

  orderPageChanged(event: any): void {
    this.orderPagination.currentPage = event.page;
    this.loadOrders();
  }

  filterOrders() {
    this.isPaymentReceivedSearch = this.isPaymentDropdownValue === 'no' ? false : true;
    this.isCompletedSearch = this.isCompletedDropdownValue === 'no' ? false : true;
    this.loadingCtrl.create({
      spinner: 'bubbles',
      message: 'please wait...'
    }).then(el =>{
      el.present();
      this.loadOrders();
      el.dismiss();
    });
  }

  segmentChanged(ev: any) {
    this.currentSegment = ev.detail.value;
  }

  loadOrders() {
    const orderParams = {
      pageNumber: this.orderPagination?.currentPage ?? 1,
      pageSize: this.orderPagination?.itemsPerPage ?? 5,
      isPaymentReceived: this.isPaymentReceivedSearch,
      isCompleted: this.isCompletedSearch,
      bookTitle: this.bookTitleSearch
    };
    this.orderService.getAllOrder(orderParams).subscribe(res => {
      this.orders = res.result;
      this.orderPagination = res.pagination;
    }, err => console.log(err));
  }

  openOrderModal(order: OrderDetails) {
    this.modalCtrl.create({
      component: DetailedOrderComponent,
      componentProps: {selectedOrder: order}
    }).then( el => {
      el.present();
    });
  }

  onDeleteOrder(orderId: number) {
    this.alertCtrl.create({
      header: 'Are you sure?',
      message: 'The order will be deleted',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'btn-secondary',
        },
        {
          text: 'Confirm',
          cssClass: 'btn-primary',
          handler: () => {
            this.orderService.deleteOrder(orderId).subscribe(res => {
              this.showSuccessMessage('Order deleted successfully');
              // reloading the orders
              this.loadingCtrl.create({
                spinner: 'bubbles',
                message: 'please wait...'
              }).then(el => {
                el.present();
                this.loadOrders();
                el.dismiss();
              });
            }, err => this.showErrorMessage('Could not delete order'));
          }
        }
      ]
    }).then(alertEl => alertEl.present());
  }
  showSuccessMessage(messageText: string) {
    this.toastCtrl.create({
      message: messageText,
      duration: 2000,
      color: 'success'
    }).then(el => el.present());
  }
  showErrorMessage(messageText: string) {
    this.toastCtrl.create({
      message: messageText,
      duration: 2000,
      color: 'danger'
    }).then(el => el.present());
  }
}

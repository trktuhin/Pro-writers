import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/_services/order.service';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { OrderDetails } from 'src/app/_models/orderDetails';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { DetailedOrderComponent } from '../detailed-order/detailed-order.component';
import { MessageService } from 'src/app/_services/message.service';
import { ContactDetails } from 'src/app/_models/contactDetails';
import { DetailedMessageComponent } from '../detailed-message/detailed-message.component';
import { CouponDetails } from 'src/app/_models/couponDetails';
import { CouponService } from 'src/app/_services/coupon.service';
import { AddCouponComponent } from '../add-coupon/add-coupon.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  orderPagination: Pagination;
  messagePagination: Pagination;
  orders: OrderDetails[] = [];
  messages: ContactDetails[] = [];
  coupons: CouponDetails[] = [];
  currentSegment = 'orders';
  bookTitleSearch = '';
  isPaymentReceivedSearch = true;
  isPaymentDropdownValue = 'yes';
  isCompletedDropdownValue = 'no';
  isCompletedSearch = false;
  messagePersonNameSearch = '';
  messagePersonEmailSearch = '';
  constructor(private orderService: OrderService,
              private loadingCtrl: LoadingController,
              private modalCtrl: ModalController,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private couponService: CouponService,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadingCtrl.create({
      spinner: 'bubbles',
      message: 'please wait...'
    }).then(el =>{
      el.present();
      this.loadOrders();
      this.loadMessages();
      this.loadCoupons();
      el.dismiss();
    });
  }

  orderPageChanged(event: any): void {
    this.orderPagination.currentPage = event.page;
    this.loadOrders();
  }
  messagePageChanged(event: any): void {
    this.messagePagination.currentPage = event.page;
    this.loadMessages();
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

  filterMessages() {
    this.loadingCtrl.create({
      spinner: 'bubbles',
      message: 'please wait...'
    }).then(el =>{
      el.present();
      this.loadMessages();
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

  loadMessages() {
    const messageParams = {
      pageNumber: this.messagePagination?.currentPage ?? 1,
      pageSize: this.messagePagination?.itemsPerPage ?? 5,
      name: this.messagePersonNameSearch,
      email: this.messagePersonEmailSearch
    };
    this.messageService.getAllMessages(messageParams).subscribe(res => {
      this.messages = res.result;
      this.messagePagination = res.pagination;
    }, err => console.log(err));
  }

  loadCoupons() {
    this.couponService.getAllCoupons().subscribe((res: CouponDetails[]) => {
      this.coupons = res;
    }, err => console.log(err));
  }

  deleteCoupon(couponId: number) {
    this.alertCtrl.create({
      header: 'Are you sure?',
      message: 'The coupon will be deleted',
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
            this.couponService.deletecoupon(couponId).subscribe(res => {
              this.showSuccessMessage('Coupon deleted successfully');
              // reloading the orders
              this.loadingCtrl.create({
                spinner: 'bubbles',
                message: 'please wait...'
              }).then(el => {
                el.present();
                this.loadCoupons();
                el.dismiss();
              });
            }, err => this.showErrorMessage('Could not delete the coupon'));
          }
        }
      ]
    }).then(alertEl => alertEl.present());
  }

  openOrderModal(order: OrderDetails) {
    this.modalCtrl.create({
      component: DetailedOrderComponent,
      componentProps: {selectedOrder: order}
    }).then( el => {
      el.present();
    });
  }

  openMessageModal(message: ContactDetails) {
    this.modalCtrl.create({
      component: DetailedMessageComponent,
      componentProps: {selectedMessage: message}
    }).then( el => {
      el.present();
    });
  }
  openAddCouponModal(actionMode: string, coupon?: CouponDetails) {
    if (actionMode === 'edit') {
      this.couponService.saveCoupon(coupon);
    }
    this.modalCtrl.create({
      component: AddCouponComponent,
      componentProps: {mode: actionMode}}).then( el => {
      el.present();
      return el.onDidDismiss();
    }).then(resultData => {
      if (resultData?.role === 'success') {
        this.loadCoupons();
      }
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
  markAsFinished(orderId: number) {
    this.orderService.markAsComplete(orderId).subscribe(res => {
      this.loadingCtrl.create({
        spinner: 'bubbles',
        message: 'please wait...'
      }).then(el => {
        el.present();
        this.loadOrders();
        this.showSuccessMessage('Marked completed succefully');
        el.dismiss();
      });
    }, err => this.showErrorMessage('Could not mark completed'));
  }
  onDeleteMessage(messageId: number) {
    this.alertCtrl.create({
      header: 'Are you sure?',
      message: 'The message will be deleted',
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
            this.messageService.deleteMessage(messageId).subscribe(res => {
              this.showSuccessMessage('Message deleted successfully');
              // reloading the messagess
              this.loadingCtrl.create({
                spinner: 'bubbles',
                message: 'please wait...'
              }).then(el => {
                el.present();
                this.loadMessages();
                el.dismiss();
              });
            }, err => this.showErrorMessage('Could not delete message'));
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

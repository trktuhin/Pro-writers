import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OrderDetails } from 'src/app/_models/orderDetails';

@Component({
  selector: 'app-detailed-order',
  templateUrl: './detailed-order.component.html',
  styleUrls: ['./detailed-order.component.scss'],
})
export class DetailedOrderComponent implements OnInit {
  @Input() selectedOrder: OrderDetails;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    // console.log(this.selectedOrder);
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OrderPageRoutingModule } from './order-routing.module';
import { OrderPage } from './order.page';
import { CreditCardPaymentComponent } from './credit-card-payment/credit-card-payment.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    OrderPageRoutingModule
  ],
  declarations: [OrderPage, CreditCardPaymentComponent]
})
export class OrderPageModule {}

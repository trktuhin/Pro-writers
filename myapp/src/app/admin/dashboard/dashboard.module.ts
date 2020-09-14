import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { PaginationModule } from 'ngx-bootstrap';
import { DetailedOrderComponent } from '../detailed-order/detailed-order.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    PaginationModule.forRoot()
  ],
  declarations: [DashboardPage, DetailedOrderComponent],
  entryComponents: [DetailedOrderComponent]
})
export class DashboardPageModule {}

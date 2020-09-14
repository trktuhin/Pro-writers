import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ModalNavComponent } from './modal-nav/modal-nav.component';
import { HttpClientModule } from '@angular/common/http';
import { PaginationModule } from 'ngx-bootstrap';
import { CreditCardPaymentComponent } from './order/credit-card-payment/credit-card-payment.component';

@NgModule({
  declarations: [AppComponent, SidebarComponent, NavbarComponent, ModalNavComponent,
    CreditCardPaymentComponent],
  entryComponents: [ModalNavComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    PaginationModule.forRoot(),
    HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

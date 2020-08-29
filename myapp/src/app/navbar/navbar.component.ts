import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalNavComponent } from '../modal-nav/modal-nav.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  openModal() {
    this.modalCtrl.create({
      component: ModalNavComponent,
      cssClass: 'modal-nav'
    }).then(el => el.present());
  }

}

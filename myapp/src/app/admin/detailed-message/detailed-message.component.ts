import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ContactDetails } from 'src/app/_models/contactDetails';

@Component({
  selector: 'app-detailed-message',
  templateUrl: './detailed-message.component.html',
  styleUrls: ['./detailed-message.component.scss'],
})
export class DetailedMessageComponent implements OnInit {
  @Input() selectedMessage: ContactDetails;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}
  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

}

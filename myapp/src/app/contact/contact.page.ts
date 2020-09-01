import { Component, OnInit } from '@angular/core';
import { MessageService } from '../_services/message.service';
import { ContactDetails } from '../_models/contactDetails';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  fullName = '';
  emailAddress = '';
  message = '';

  constructor(private messageService: MessageService, private toastCtrl: ToastController) { }

  ngOnInit() {
  }

  SendMessage() {
    const model: ContactDetails = {
      name: this.fullName,
      messageDetails: this.message,
      email: this.emailAddress
    };
    this.messageService.sendMessage(model).subscribe(res => {
      this.showSuccessMessage();
      this.fullName = '';
      this.message = '';
      this.emailAddress = '';
    }, err => console.log(err));
  }

  showSuccessMessage() {
    this.toastCtrl.create({
      message: 'Message sent successfully !',
      duration: 3000,
      position: 'top',
      color: 'success'
    }).then(el => el.present());
  }

}

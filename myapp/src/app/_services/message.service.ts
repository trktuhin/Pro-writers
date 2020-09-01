import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ContactDetails } from '../_models/contactDetails';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  baseUrl = environment.baseServer + 'Contact/';

  constructor(private http: HttpClient) { }

  sendMessage(message: ContactDetails) {
    return this.http.post(this.baseUrl + 'AddMessage', message);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ContactDetails } from '../_models/contactDetails';
import { PaginatedResult } from '../_models/Pagination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  baseUrl = environment.baseServer + 'Contact/';

  constructor(private http: HttpClient) { }

  sendMessage(message: ContactDetails) {
    return this.http.post(this.baseUrl + 'AddMessage', message);
  }

  getAllMessages(messageParams) {
    const paginatedResult: PaginatedResult<ContactDetails[]> = new PaginatedResult<ContactDetails[]>();
    return this.http.post(this.baseUrl + 'GetAllMessages', messageParams, {observe: 'response'}).pipe(
      map((res: any) => {
        paginatedResult.result = res.body;
        if (res.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(res.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
  }

  deleteMessage(id: number) {
    return this.http.delete(this.baseUrl + 'deleteMessage/' + id);
  }

}

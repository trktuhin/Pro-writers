import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.baseServer + 'auth/';
  decodedToken: any;
  currentUser: any;
  token = new BehaviorSubject<string>('');
  currentToken = this.token.asObservable();
  jwtHelper = new JwtHelperService();
  constructor(private http: HttpClient) { }

  get IsLoggedIn() {
    let result = false;
    const token = localStorage.getItem('token');
    try {
      result = !this.jwtHelper.isTokenExpired(token);
    } catch (error) {
      result = false;
    }
    return result;
  }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          // localStorage.setItem('user', JSON.stringify(user.user));
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          // localStorage.setItem('nameid', this.decodedToken.nameid);
          if (user.user) {
            this.currentUser = user.user;
          }
        }
      })
    );
  }

  logout() {
    localStorage.clear();
  }

}

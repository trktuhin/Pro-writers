import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Platform, ToastController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private platform: Platform,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this. createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      username: ['',[Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)] ]
    });
  }

  login() {
    const loader = this.loadingCtrl.create();
    loader.then(el => el.present());
    const model = {
      username: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value
    };
    this.authService.login(model).subscribe(next => {
      this.toastCtrl.create({
        message: 'Logged in successfully',
        duration: 1000,
        color: 'success'
      }).then(el => {
        el.present();
        loader.then(ldel => ldel.dismiss());
        // this.router.navigateByUrl('/dashboard');
      });
    }, err => {
      loader.then(ldel => ldel.dismiss());
      console.log(err);
      this.toastCtrl.create({
        message: err,
        duration: 1000,
        color: 'danger'
      }).then(el => {
        el.present();
      });
    });
  }

}
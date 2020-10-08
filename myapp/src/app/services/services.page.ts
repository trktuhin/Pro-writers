import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {

  constructor(private router: Router, private title: Title, private meta: Meta) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.title.setTitle('Services | Writogen');
    this.meta.updateTag({
      name: 'description',
      content: `This page is about the details of the services provide by writogen, the best ghost writing servce.
      `
    });
  }
  goToOrder() {
    this.router.navigate(['order']);
  }

}

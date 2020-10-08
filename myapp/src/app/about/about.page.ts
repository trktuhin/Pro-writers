import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor(private router: Router, private title: Title, private meta: Meta) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.title.setTitle('About | Writogen');
    this.meta.updateTag({
      name: 'description',
      content: `All frequently asked questions about writogen can be found here like pricing of the
      word count for each e-book writing, types of books and a lot more.
      `
    });
  }

}

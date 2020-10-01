import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../_services/order.service';
import { OrderDetails } from '../_models/orderDetails';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  orderForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private orderService: OrderService) { }

  ngOnInit() {
    this.createOrderForm();
  }

  createOrderForm() {
    this.orderForm = this.fb.group({
      bookTitle: ['', [Validators.required]],
      subTitle: ['', [Validators.required]],
      authorName: ['', [Validators.required]],
      projectDescription: ['', [Validators.required]],
      noOfWord: [10000, [Validators.required]],
      clientName: ['', [Validators.required]],
      clientEmail: ['', [Validators.required, Validators.email]],
      customizedCopyrightPage: [false],
      professionalBookDescription: [false],
      plagiarismReport: [false],
      wordFormatting: [false],
      docFile: ['']
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.orderForm.patchValue({
        docFile: file
      });
    }
  }

  getTotalPrice() {
    let bookPrice = (+this.orderForm.get('noOfWord').value / 1000) * 15;
    if (this.orderForm.get('customizedCopyrightPage').value) {
      bookPrice += 10;
    }
    if (this.orderForm.get('plagiarismReport').value) {
      bookPrice += 15;
    }
    return bookPrice;
  }

  addToCart() {
    const currentOrder: OrderDetails = {
      bookTitle: this.orderForm.get('bookTitle').value,
      subTitle: this.orderForm.get('subTitle').value,
      authorName: this.orderForm.get('authorName').value,
      projectDescription: this.orderForm.get('projectDescription').value,
      noOfWord: this.orderForm.get('noOfWord').value,
      clientName: this.orderForm.get('clientName').value,
      clientEmail: this.orderForm.get('clientEmail').value,
      customizedCopyrightPage: this.orderForm.get('customizedCopyrightPage').value,
      professionalBookDescription: this.orderForm.get('professionalBookDescription').value,
      plagiarismReport: this.orderForm.get('plagiarismReport').value,
      wordFormatting: this.orderForm.get('wordFormatting').value,
      docFile: this.orderForm.get('docFile').value
    };
    this.orderService.saveOrder(currentOrder);
    this.router.navigate(['checkout']);
  }
}

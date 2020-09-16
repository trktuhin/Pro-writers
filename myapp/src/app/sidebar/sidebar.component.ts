import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {}
  logout() {
    this.authService.logout();
    this.router.navigate(['admin/login']);
  }

}

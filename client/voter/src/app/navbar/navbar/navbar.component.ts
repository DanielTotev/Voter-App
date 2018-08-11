import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.toastr.success('User logout successful', 'Success');
  }
}

import { Component } from '@angular/core';
import { LoginModel } from '../models/login.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formData: LoginModel;

  constructor(private authService: AuthService) {
    this.formData = new LoginModel('', '');
  }

  login() {
    this.authService.login(this.formData);
  }

}

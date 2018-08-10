import { Component } from '@angular/core';
import { RegisterModel } from '../models/register.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formData: RegisterModel;

  constructor(private authService: AuthService, private router: Router) {
    this.formData = new RegisterModel('', '', '');
  }

  register() {
    this.authService.register(this.formData)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/login']);
      })
  }

}

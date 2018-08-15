import  { Injectable } from '@angular/core';
import { RegisterModel } from './models/register.model';
import { HttpClient } from '@angular/common/http';
import { UserModel } from './models/user.model';
import { LoginModel } from './models/login.model';
import { Router } from '@angular/router';

const BASE_URL = 'http://localhost:1337/';
const REGISTER_URL = `${BASE_URL}user/register`;
const LOGIN_URL = `${BASE_URL}user/login`;


@Injectable({
    providedIn: 'root'
})
export class AuthService { 
    user: UserModel;
    authtoken: string = null;

    constructor (private http: HttpClient, private router: Router) { }

    register(userData: RegisterModel) {
        return this.http.post(REGISTER_URL, userData);
    }

    login(userData: LoginModel) {
        return this.http.post(LOGIN_URL, userData)
            .subscribe(data => {
                this.saveUser(data);
                this.router.navigate(['/']);
            });
    }

    isLoggedIn() {
        return this.authtoken !== null;
    }

    isAdmin() {
        return this.user && this.user.roles.includes('Admin');
    }

    logout() {
        this.authtoken = null;
        this.user = null;
    }

    private saveUser(data) {
        this.user = data['user'];
        this.authtoken = data['authtoken'];
        console.log(this.user);
    }
}
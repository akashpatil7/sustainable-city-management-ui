import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { LoginRegisterServiceService } from '../services/login-register-service.service';
import { Router } from '@angular/router';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-service-component',
  templateUrl: './user-service-component.component.html',
  styleUrls: ['./user-service-component.component.css']
})

export class UserServiceComponentComponent implements OnInit {
  responseMessage: String = '';

  constructor(private loginService: LoginRegisterServiceService, private router: Router) { }

  ngOnInit(): void {
    /*
    if(this.auth.isLoggedIn()){
      this.router.navigateByUrl('/real-time-dashboard');
    }*/
  }

  checkPasswords(password1: string, password2: string) {
    if (password1 == password2) return true;
    else return false;
  }

  onLogin(data: { email: string; password: string; }) {
    if (this.isValidEmail(data.email)) {
      this.loginService.loginUser(data.email, data.password).subscribe({
        next: this.handleLoginResponse.bind(this),
        error: this.handleLoginError.bind(this)
      });
    }
    else {
      this.showLoginError('Invalid Email');
    }
  }

  handleLoginResponse(data: { [key: string]: string }) {
    var token = data["token"];
    localStorage.setItem("token", token);
    if (token) {
      this.router.navigateByUrl('/real-time-dashboard');
    }
  }

  handleLoginError(error: HttpErrorResponse) {
    this.showLoginError(error.name);
  }

  onRegister(data: { email: string; username: string; password1: string; password2: string; }) {
    if (this.checkPasswords(data.password1, data.password2) && this.isValidEmail(data.email)) {
      this.loginService.sendRegisterDetails(data.email, data.password1, data.username).subscribe({
        next: this.handleRegisterResponse.bind(this),
        error: this.handleRegisterError.bind(this)
      });
    }
    else {
      this.showRegisterError("Invalid email or password.")
    }
  }

  handleRegisterResponse(data: { [key: string]: string }) {
    console.log(data);
    this.openLoginView();
    this.responseMessage = 'Registration Successful, please login';
    let popup = document.getElementById('response1');
    if (popup) {
      popup.style.display = 'block';
      popup.style.backgroundColor = '#98FB98';
    }
  }

  handleRegisterError(error: HttpErrorResponse) {
    console.log(error);
    this.showRegisterError(error.error)
  }

  showRegisterError(error: string) {
    this.responseMessage = error;
    let popup = document.getElementById('response2');
    if (popup) {
      popup.style.display = 'block';
      popup.style.backgroundColor = '#FF2400';
    }
  }

  showLoginError(error: string){
    this.responseMessage = error;
    let popup = document.getElementById('response1');
    if (popup) {
      popup.style.display = 'block';
      popup.style.backgroundColor = '#FF2400';
    }
  }

  isValidEmail(email: string) {
    var validEmail = new RegExp("^[a-zA-Z0-9_.+-]+@dublincity\.ie$");
    if (validEmail.test(email)) {
      return true;
    } else {
      return false;
    }
  }

  openRegisterView() {
    this.clearPopups();
    var registerView = document.getElementById("register-form-wrap");
    if (registerView) {
      registerView.style.display = "block";
    }

    var loginView = document.getElementById("login-form-wrap");
    if (loginView) {
      loginView.style.display = "none";
    }
  }

  openLoginView() {
    this.clearPopups();
    var registerView = document.getElementById("register-form-wrap");
    if (registerView) {
      registerView.style.display = "none";
    }

    var loginView = document.getElementById("login-form-wrap");
    if (loginView) {
      loginView.style.display = "block";
    }
  }

  clearPopups(){
    let popup1 = document.getElementById('response1');
    if (popup1) {
      popup1.style.display = 'none';
    }

    let popup2 = document.getElementById('response2');
    if (popup2) {
      popup2.style.display = 'none';
    }
  }

}

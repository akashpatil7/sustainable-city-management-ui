import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { LoginRegisterServiceService } from '../services/login-register-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-service-component',
  templateUrl: './user-service-component.component.html',
  styleUrls: ['./user-service-component.component.css']
})

export class UserServiceComponentComponent {
  responseMessage: String = '';

  constructor(private loginService: LoginRegisterServiceService, private router: Router) { }

  /**
   * Checks if passwords input when registering are the same
   *
   * @param {string} password1
   * @param {string} password2
   * @returns {boolean}
   */
  checkPasswords(password1: string, password2: string) {
    if (password1 == password2) return true;
    else return false;
  }

  /**
   *  Sends login request to the backend with user details
   *
   * @param {object} data
   */
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
  
  /**
   * On successful login, the session token is stored in localStorage and the user is redirected
   *
   * @param {object} data
   */
  handleLoginResponse(data: { [key: string]: string }) {
    var token = data["token"];
    localStorage.setItem("token", token);
    if (token) {
      // user is redirected to real time dashboard
      this.router.navigateByUrl('/real-time-dashboard');
    }
  }

  /**
   * Handles login error response
   *
   * @param {HttpErrorResponse} error
   */
  handleLoginError(error: HttpErrorResponse) {
    this.showLoginError(error.name);
  }

  /**
   * Registers user if valid input credentials
   *
   * @param {object} data
   */
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

  /**
   * Handles registration error response
   *
   * @param {object} data
   */
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

  /**
   * Handles registration error
   *
   * @param {HttpErrorResponse} error
   */
  handleRegisterError(error: HttpErrorResponse) {
    console.log(error);
    this.showRegisterError(error.error)
  }

  /**
   * Displays registration error message to the user
   *
   * @param {string} error
   */
  showRegisterError(error: string) {
    this.responseMessage = error;
    let popup = document.getElementById('response2');
    if (popup) {
      popup.style.display = 'block';
      popup.style.backgroundColor = '#FF2400';
    }
  }

  /**
   * Displays login error message to the user
   *
   * @param {string} error
   */
  showLoginError(error: string){
    this.responseMessage = error;
    let popup = document.getElementById('response1');
    if (popup) {
      popup.style.display = 'block';
      popup.style.backgroundColor = '#FF2400';
    }
  }

  /**
   * Checks if email input when logging in/registering is a of @dublincity.ie domain 
   *
   * @param {string} email
   * @return {boolean}
   */
  isValidEmail(email: string):boolean {
    let validEmail = new RegExp("^[a-zA-Z0-9_.+-]+@dublincity\.ie$");
    if (validEmail.test(email)) {
      return true;
    } else {
      return false;
    }
  }

  /*
   * Sets the user's current view to the register box 
   */
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

  /*
   * Sets the user's current view to the login box 
   */
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

  /*
   * Clear any popups
   */
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

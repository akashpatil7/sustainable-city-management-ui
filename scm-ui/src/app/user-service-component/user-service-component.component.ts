import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { LoginRegisterServiceService } from '../login-register-service.service';
import { Router } from '@angular/router';

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
    this.loginService.loginUser(data.email, data.password).subscribe({
      next: this.handleLoginResponse.bind(this),
      error: this.handleLoginError.bind(this)
   });
}

  handleLoginResponse(data: { [key: string]: string}) {
      var token = data["token"];
      localStorage.setItem("token", token);
      if (token) {
        this.router.navigateByUrl('/real-time-dashboard');
      }
  }

  handleLoginError(error: HttpErrorResponse) {
    window.alert("There was an error logging in: " + error.error)
  }

  onRegister(data: { email: string; username: string; password1: string; password2: string; }) {
    if (this.checkPasswords(data.password1, data.password2) && this.isValidEmail) {
      this.loginService.sendRegisterDetails(data.email, data.password1, data.username).subscribe(data => {
        console.log(data);
        this.openLoginView();
        this.responseMessage = 'Registration Successful, please login';
        let popup = document.getElementById('response1');
        if (popup) {
          popup.style.display = 'block';
          popup.style.backgroundColor = '#98FB98';
        }
      }, (error) => {
        console.log(error);
        this.responseMessage = error.error;
        let popup = document.getElementById('response2');
        if (popup) {
          popup.style.display = 'block';
          popup.style.backgroundColor = '#FF2400';
        }
      });
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
    var registerView = document.getElementById("register-form-wrap");
    if (registerView) {
      registerView.style.display = "none";
    }

    var loginView = document.getElementById("login-form-wrap");
    if (loginView) {
      loginView.style.display = "block";
    }
  }

}

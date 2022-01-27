import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-service-component',
  templateUrl: './user-service-component.component.html',
  styleUrls: ['./user-service-component.component.css']
})
export class UserServiceComponentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onLogin(data: { email: string; password: string; }) {
    alert("Entered Email id : " + data.password);
  }

  onRegister(data: { email: string; username: string; password1: string; password2: string;}) {
    alert("Entered Username : " + data.username);
  }

  isValidEmail(email: string) {
    var validEmail = new RegExp("^[a-zA-Z0-9_.+-]+@dublincity\.ie$");
    if (validEmail.test(email)) {
        return true;
    } else {
        return false;
    }
  }

  openRegisterView(){
    var registerView = document.getElementById("register-form-wrap");
    if(registerView){
      registerView.style.display = "block";
    }

    var loginView = document.getElementById("login-form-wrap");
    if(loginView){
      loginView.style.display = "none";
    }
  }

  openLoginView(){
    var registerView = document.getElementById("register-form-wrap");
    if(registerView){
      registerView.style.display = "none";
    }

    var loginView = document.getElementById("login-form-wrap");
    if(loginView){
      loginView.style.display = "block";
    }
  }

}

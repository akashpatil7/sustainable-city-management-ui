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

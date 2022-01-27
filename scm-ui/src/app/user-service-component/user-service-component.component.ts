import { Component, OnInit } from '@angular/core';
import { LoginRegisterServiceService } from '../login-register-service.service';

@Component({
  selector: 'app-user-service-component',
  templateUrl: './user-service-component.component.html',
  styleUrls: ['./user-service-component.component.css']
})
export class UserServiceComponentComponent implements OnInit {

  constructor(private loginService: LoginRegisterServiceService) { }

  ngOnInit(): void {
  }

  checkPasswords(password1: string, password2: string){
    if(password1 == password2) return true;
    else return false;
  }

  onLogin(data: { email: string; password: string; }) {
    alert("Entered Email id : " + data.password);
  }

  onRegister(data: { email: string; username: string; password1: string; password2: string;}) {
    if(this.checkPasswords(data.password1, data.password2)){
      var obs = this.loginService.sendRegisterDetails(data.email, data.password1, data.username);
      obs.subscribe(data => {
        console.log(data);
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

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }
 
  isLoggedIn(){
    console.log(localStorage.getItem('token'));
    if(localStorage.getItem('token') != ""){
      return true;
    }
    else{
      this.router.navigateByUrl('/login');
      return false;
    }
  }
  
  canActivate(){
    if(this.isLoggedIn()) return true;
    else return false;
  }

  logout() {
    if(localStorage.getItem('token')){
      localStorage.removeItem("token");
      window.alert("You have been logged out.");
    }
  }
}

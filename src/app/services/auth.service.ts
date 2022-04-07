import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }
 
  /**
   * Checks local storage for a token to see if the user is logged in
   *
   * @returns {boolean}
   */
  isLoggedIn():boolean {
    console.log(localStorage.getItem('token'));
    if(localStorage.getItem('token')){
      return true;
    }
    else{
      this.router.navigateByUrl('/login');
      return false;
    }
  }
  
  /**
   * Checks if user is logged in
   *
   * @returns {boolean}
   */
  canActivate(){
    if(this.isLoggedIn()) return true;
    else return false;
  }

  /*
   * Logs the user out by removing the token from local storage
   */
  logout() {
    if(localStorage.getItem('token')){
      localStorage.removeItem("token");
      window.alert("You have been logged out.");
    }
    localStorage.clear();
  }
}

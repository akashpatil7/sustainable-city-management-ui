import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logout',
  template: "",
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    /*
    * Logout the user
    */
    this.authService.logout();
    /*
    * Redirect user to login page
    */
    this.router.navigate(['login']);   
  }

}

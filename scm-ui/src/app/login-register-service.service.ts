import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class LoginRegisterServiceService {
  BACKEND_URL:string = 'http://localhost:8080/user/';

  constructor(private http: HttpClient) {}

  loginUser(email: string, password: string){
    //this.http.post(this.BACKEND_URL + '/login', userObj);
  
  }

  sendRegisterDetails(email: string, password: string, username: string){
    var userObj = {
      _id: email, 
      user_name: username,
      password: password
    };

    console.log(userObj);
    //this.http.post(this.BACKEND_URL + '/register', userObj);
  }
}


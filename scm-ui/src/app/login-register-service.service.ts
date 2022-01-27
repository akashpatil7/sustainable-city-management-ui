import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class LoginRegisterServiceService {
  BACKEND_URL:string = 'http://localhost:8080/user';

  constructor(private http: HttpClient) {}

  loginUser(email: string, password: string){
    //this.http.post(this.BACKEND_URL + '/login', userObj);
  
  }

  sendRegisterDetails(email: string, password: string, username: string){
    var userObj = {
      "email": email, 
      "username": username,
      "password": password,
    };

    var options = { headers: new HttpHeaders({ "Access-Control-Allow-Origin": "*" }) };
    return this.http.post<any>(this.BACKEND_URL + '/register', userObj, options)
  }
}


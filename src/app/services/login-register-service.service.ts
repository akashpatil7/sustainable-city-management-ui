import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class LoginRegisterServiceService {

  BACKEND_URL:string = "http://" + environment.hostName + "/user";

  constructor(private http: HttpClient) {}

  /**
   * POST request: Logs in the user
   *
   * @param {string} email
   * @param {string} password
   * @returns {Observable}
   */
  loginUser(email: string, password: string){
    var userObj = {
      "email": email, 
      "password": password,
    };
    
    let options = { headers: new HttpHeaders({ "Access-Control-Allow-Origin": "*"})};
    return this.http.post<any>(this.BACKEND_URL + '/login', userObj, options);  
  }

  /**
   * POST request: Registers user details
   *
   * @param {string} email
   * @param {string} password
   * @param {string} username
   * @returns {Observable}
   */
  sendRegisterDetails(email: string, password: string, username: string){
    var userObj = {
      "email": email, 
      "username": username,
      "password": password,
    };

    var options = { headers: new HttpHeaders({ "Access-Control-Allow-Origin": "*" }) };
    return this.http.post<any>(this.BACKEND_URL + '/register', userObj, options);
  }
}


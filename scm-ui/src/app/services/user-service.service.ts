import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import User from './models/User';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private baseUrl = 'http://localhost:8080/user/';

  constructor(private http: HttpClient){
  }

  loginUser(user: Object): Observable<Object>{
    return this.http.post(this.baseUrl + "/login", user);
  }

  registerUser(user: Object): Observable<Object>{
    return this.http.post(this.baseUrl + "/register", user);
  }

}

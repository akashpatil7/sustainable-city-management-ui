import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrendsService {

  constructor(private http: HttpClient) { }
  
  // get hourly bike averages
  getHourlyAverage():Observable<any> {
    let token: string = localStorage.getItem("token") || '{}'
    let header = new HttpHeaders({ "Access-Control-Allow-Origin": "*", "Authorization": "Bearer " + token})
    return this.http.get("http://localhost:8080/getHourlyAverageForAllStation", { headers: header});
  }
  
}

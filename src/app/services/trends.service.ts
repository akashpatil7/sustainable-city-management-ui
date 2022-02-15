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
    let options = { headers: new HttpHeaders({ "Access-Control-Allow-Origin": "*"})};
    return this.http.get("http://localhost:8050/getHourlyAverageForAllStation", options);
  }
  
}

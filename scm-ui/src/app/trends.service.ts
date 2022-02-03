import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrendsService {

  constructor(private http: HttpClient) { }
  
  // get hourly bike averages
  getHourlyAverage():Observable<any> {
    return this.http.get("http://localhost:8050/getHourlyAverageForAllStation");
  }
  
}

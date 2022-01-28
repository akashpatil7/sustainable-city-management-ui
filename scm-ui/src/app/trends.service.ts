import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrendsService {

  constructor(private http: HttpClient) { }
  
  // get trends from backend as JSON object
  getTrendsData() : Observable<any> {
    return  this.http.post("http://localhost:7001/trends/getTrendsData", {"startDate": "2021-01-01","endDate": "2021-02-02","dataIndicator": "bikes"});
  }
  
}

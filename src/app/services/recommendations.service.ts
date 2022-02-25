import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommendationsService {

  constructor(private http:HttpClient) { }
  
  // get Dublin bike recomendations
  getBikeRecommendations():Observable<any> {
    let token: string = localStorage.getItem("token") || '{}'
    let header = new HttpHeaders({ "Access-Control-Allow-Origin": "*", "Authorization":  "Bearer " + token})
    return this.http.get("http://localhost:5000/recommendations/bike/getRecommendations", { headers: header});
  }
  
}

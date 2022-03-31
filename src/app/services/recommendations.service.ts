import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommendationsService {

  constructor(private http:HttpClient) { }

  // get Dublin bike recommendations
  getBikeRecommendations():Observable<any> {
    let token: string = localStorage.getItem("token") || '{}'
    let header = new HttpHeaders({ "Access-Control-Allow-Origin": "*", "Authorization":  "Bearer " + token})
    return this.http.get("http://localhost:8050/recommendations/bike/getRecommendations", { headers: header});
  }

  // get Aqi recommendations
  getAqiRecommendations():Observable<any> {
    let token: string = localStorage.getItem("token") || '{}'
    let header = new HttpHeaders({ "Access-Control-Allow-Origin": "*", "Authorization":  "Bearer " + token})
    return this.http.get("http://localhost:8050/recommendations/aqi/getRecommendations", { headers: header});
  }

  // get Pedestrian recommendations
   getPedestrianRecommendations():Observable<any> {
      let token: string = localStorage.getItem("token") || '{}'
      let header = new HttpHeaders({ "Access-Control-Allow-Origin": "*", "Authorization":  "Bearer " + token})
      return this.http.get("http://localhost:8050/recommendations/pedestrian/getRecommendations", { headers: header});
    }

  // get Bus recommendations
  getBusRecommendations():Observable<any> {
    let token: string = localStorage.getItem("token") || '{}'
    let header = new HttpHeaders({ "Access-Control-Allow-Origin": "*", "Authorization":  "Bearer " + token})
    return this.http.get("http://localhost:8050/recommendations/bus/getRecommendations", { headers: header});
  }

  // get Bike-Pedestrian recommendations
  getBikePedestrianRecommendations():Observable<any> {
    let token: string = localStorage.getItem("token") || '{}'
    let header = new HttpHeaders({ "Access-Control-Allow-Origin": "*", "Authorization":  "Bearer " + token})
    return this.http.get("http://localhost:8050/recommendations/bike/getBikePedestrianRecommendations", { headers: header});
  }

  // get hourly bike averages
  getHourlyAverage():Observable<any> {
    let token: string = localStorage.getItem("token") || '{}'
    let header = new HttpHeaders({ "Access-Control-Allow-Origin": "*", "Authorization": "Bearer " + token})
    return this.http.get("http://localhost:8050/trends/bike/getHourlyAverageForAllStation", { headers: header});
  }

  // get Aqi recommendations From Prediction Model
  getAqiRecommendationFromPrediction():Observable<any> {
    let token: string = localStorage.getItem("token") || '{}'
    let header = new HttpHeaders({ "Access-Control-Allow-Origin": "*", "Authorization":  "Bearer " + token})
    return this.http.get("http://localhost:8050/models/aqi/getAqiRecommendationFromPrediction", { headers: header});
  }

  // get Aqi recommendations From Prediction Model For future timestamp
    getAqiRecommendationFromFuturePrediction():Observable<any> {
      let token: string = localStorage.getItem("token") || '{}'
      let header = new HttpHeaders({ "Access-Control-Allow-Origin": "*", "Authorization":  "Bearer " + token})
      return this.http.get("http://localhost:8050/models/aqi/getAqiRecommendationFromFuturePrediction", { headers: header});
    }

   // get Pedestrian recommendations From Prediction Model
   getPedestrianRecommendationFromPrediction():Observable<any> {
      let token: string = localStorage.getItem("token") || '{}'
      let header = new HttpHeaders({ "Access-Control-Allow-Origin": "*", "Authorization":  "Bearer " + token})
      return this.http.get("http://localhost:8050/models/pedestrian/getPedestrianRecommendationFromPrediction", { headers: header});
    }

    // get Pedestrian recommendations From Prediction Model for future timestamp
    getPedestrianRecommendationFromFuturePrediction():Observable<any> {
       let token: string = localStorage.getItem("token") || '{}'
       let header = new HttpHeaders({ "Access-Control-Allow-Origin": "*", "Authorization":  "Bearer " + token})
       return this.http.get("http://localhost:8050/models/pedestrian/getPedestrianRecommendationFromFuturePrediction", { headers: header});
     }
}

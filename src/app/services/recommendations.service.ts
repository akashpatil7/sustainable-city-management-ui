import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecommendationsService {

  constructor(private http:HttpClient) { }

  // get Dublin bike recommendations
  getBikeRecommendations():Observable<any> {
    let token: string = localStorage.getItem("token") || '{}'
    let header = new HttpHeaders({ "Access-Control-Allow-Origin": "*", "Authorization":  "Bearer " + token})
    return this.http.get("http://" + environment.hostName + "/recommendations/bike/getRecommendations", { headers: header});
  }

  // get Aqi recommendations
  getAqiRecommendations():Observable<any> {
    let token: string = localStorage.getItem("token") || '{}'
    let header = new HttpHeaders({ "Access-Control-Allow-Origin": "*", "Authorization":  "Bearer " + token})
    return this.http.get("http://" + environment.hostName + "/recommendations/aqi/getRecommendations", { headers: header});
  }

  // get Pedestrian recommendations
   getPedestrianRecommendations():Observable<any> {
      let token: string = localStorage.getItem("token") || '{}'
      let header = new HttpHeaders({ "Access-Control-Allow-Origin": "*", "Authorization":  "Bearer " + token})
      return this.http.get("http://" + environment.hostName + "/recommendations/pedestrian/getRecommendations", { headers: header});
    }

  // get Bus recommendations
  getBusRecommendations():Observable<any> {
    let token: string = localStorage.getItem("token") || '{}'
    let header = new HttpHeaders({ "Access-Control-Allow-Origin": "*", "Authorization":  "Bearer " + token})
    return this.http.get("http://" + environment.hostName + "/recommendations/bus/getRecommendations", { headers: header});
  }

  // get Bike-Pedestrian recommendations
  getBikePedestrianRecommendations():Observable<any> {
    let token: string = localStorage.getItem("token") || '{}'
    let header = new HttpHeaders({ "Access-Control-Allow-Origin": "*", "Authorization":  "Bearer " + token})
    return this.http.get("http://" + environment.hostName + "/recommendations/bike/getBikePedestrianRecommendations", { headers: header});
  }
  
  // get hourly bike averages
  getHourlyAverage():Observable<any> {
    let token: string = localStorage.getItem("token") || '{}'
    let header = new HttpHeaders({ "Access-Control-Allow-Origin": "*", "Authorization": "Bearer " + token})
    return this.http.get("http://" + environment.hostName + "/trends/bike/getHourlyAverageForAllStation", { headers: header});
  }

}

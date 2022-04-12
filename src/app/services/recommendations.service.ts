import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecommendationsService {

  constructor(private http:HttpClient) { }

  /**
   * GET request: Get bike recommendations
   *
   * @returns {Observable<any>}
   */
  getBikeRecommendations():Observable<any> {
    let token: string = localStorage.getItem("token") || '{}'
    let header = new HttpHeaders({ "Access-Control-Allow-Origin": "*", "Authorization":  "Bearer " + token})
    return this.http.get("http://" + environment.hostName + "/recommendations/bike/getRecommendations", { headers: header});
  }

  /**
   * GET request: Get AQI recommendations
   *
   * @returns {Observable<any>}
   */
  getAqiRecommendations():Observable<any> {
    let token: string = localStorage.getItem("token") || '{}'
    let header = new HttpHeaders({ "Access-Control-Allow-Origin": "*", "Authorization":  "Bearer " + token})
    return this.http.get("http://" + environment.hostName + "/recommendations/aqi/getRecommendations", { headers: header});
  }

  /**
   * GET request: Get pedestrian recommendations
   *
   * @returns {Observable<any>}
   */
   getPedestrianRecommendations():Observable<any> {
      let token: string = localStorage.getItem("token") || '{}'
      let header = new HttpHeaders({ "Access-Control-Allow-Origin": "*", "Authorization":  "Bearer " + token})
      return this.http.get("http://" + environment.hostName + "/recommendations/pedestrian/getRecommendations", { headers: header});
    }

    /**
     * GET request: Get bus recommendations
     *
     * @returns {Observable<any>}
     */
    getBusRecommendations():Observable<any> {
      let token: string = localStorage.getItem("token") || '{}'
      let header = new HttpHeaders({ "Access-Control-Allow-Origin": "*", "Authorization":  "Bearer " + token})
      return this.http.get("http://" + environment.hostName + "/recommendations/bus/getRecommendations", { headers: header});
    }

    /**
     * GET request: Get bike-pedestrian recommendations
     *
     * @returns {Observable<any>}
     */
    getBikePedestrianRecommendations():Observable<any> {
      let token: string = localStorage.getItem("token") || '{}'
      let header = new HttpHeaders({ "Access-Control-Allow-Origin": "*", "Authorization":  "Bearer " + token})
      return this.http.get("http://" + environment.hostName + "/recommendations/bike/getBikePedestrianRecommendations", { headers: header});
    }
  
    /**
     * GET request: Get hourly average bike recommendations
     *
     * @returns {Observable<any>}
     */
    getHourlyAverage():Observable<any> {
      let token: string = localStorage.getItem("token") || '{}'
      let header = new HttpHeaders({ "Access-Control-Allow-Origin": "*", "Authorization": "Bearer " + token})
      return this.http.get("http://" + environment.hostName + "/trends/bike/getHourlyAverageForAllStation", { headers: header});
    }
}

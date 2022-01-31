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
    return this.http.post("http://localhost:7001/trends/getTrendsData", {"startDate": "2021-01-01","endDate": "2021-02-02","dataIndicator": "bikes"});
  }
  
  getTrendsFromBackend():Observable<any> {
    return this.http.post("http://localhost:8050/getDailyAverages", {"_id":45867013,"harvestTime":{"$numberLong":"1643305202"},"stationId":2,"availableBikeStands":18,"bikeStands":20,"availableBikes":2,"banking":false,"bonus":false,"lastUpdate":{"$numberLong":"1643305080"},"status":"OPEN","address":"Blessington Street","name":"BLESSINGTON STREET","latitude":"53.3568","longitude":"-6.26814","_class":"com.tcd.ase.externaldata.entity.DublinBikes"});

  }
  
}

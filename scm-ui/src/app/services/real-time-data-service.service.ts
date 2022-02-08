import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DublinBikesData } from '../models/DublinBikesData';
import { Observer } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RealTimeDataService {

  private baseUrl = 'http://localhost:7002/realTimeData';
  private dublinBikesDataObjects: DublinBikesData = {
    id: 0,
    harvestTime: '',
    stationId: '',
    availableBikeStands: 0,
    bikeStands: 0,
    availableBikes: 0,
    lastUpdate: '',
    status: '',
    name: '',
    latitude: 0,
    longitude: 0
  };

  constructor(private http: HttpClient) {
  }

  getRealTimeData():Observable<any> {
    return new Observable((observer: Observer<any>) => {
      const eventSource = new EventSource(`${this.baseUrl}`);
      eventSource.onmessage = (event) => {
        const json = JSON.parse(event.data);
        this.dublinBikesDataObjects = json;
        observer.next(this.dublinBikesDataObjects);
      };
      eventSource.onerror = (error) => observer.error('eventSource.onerror: ' + error);
      return () => eventSource.close();
    });
  
  }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DublinBikesData } from '../models/DublinBikesData';
import { DublinBusData } from '../models/DublinBusData';
import { Observer } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RealTimeDataService {

  private baseUrl = 'http://localhost:8005';
  private dublinBikesDataObjects: DublinBikesData = {
    id: 0,
    harvest_time: '',
    station_id: '',
    available_bike_stands: 0,
    bike_stands: 0,
    available_bikes: 0,
    last_update: '',
    status: '',
    name: '',
    latitude: 0,
    longitude: 0
  };
  private dublinBusDataObjects: DublinBusData = {
    trip_id: 0,
    route_long: '',
    route_short: '',
    scheduled_relationship: '',
    start_timestamp: '',
    stop_sequence: [],
    route_id: '',
    creation_date: '',
    last_modified: ''
  };

  constructor(private http: HttpClient) {
  }

  // get real time bike data
  getRealTimeBikeData():Observable<any> {
    return new Observable((observer: Observer<any>) => {
      const eventSource = new EventSource(`${this.baseUrl}` + "/getRealTimeDataForBike/?Authorization=" + localStorage.getItem("token"));
      eventSource.onmessage = (event) => {
        const json = JSON.parse(event.data);
        this.dublinBikesDataObjects = json;
        observer.next(this.dublinBikesDataObjects);
      };
      eventSource.onerror = (error) => observer.error('eventSource.onerror: ' + error);
      return () => eventSource.close();
    });
  }
  
  // get real time bus data
  getRealTimeBusData():Observable<any> {
    return new Observable((observer: Observer<any>) => {
      const eventSource = new EventSource(`${this.baseUrl}` + "/getRealTimeDataForBus/?Authorization=" + localStorage.getItem("token"));
      eventSource.onmessage = (event) => {
        const json = JSON.parse(event.data);
        this.dublinBusDataObjects = json;
        console.log(this.dublinBusDataObjects)
        observer.next(this.dublinBusDataObjects);
      };
      eventSource.onerror = (error) => observer.error('eventSource.onerror: ' + error);
      return () => eventSource.close();
    });
  }
}
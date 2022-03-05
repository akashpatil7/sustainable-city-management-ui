import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DublinBikesData } from '../models/DublinBikesData';
import { DublinBusData } from '../models/DublinBusData';
import { Observer } from 'rxjs';
import { AqiData } from '../models/AqiData';

@Injectable({ providedIn: 'root' })
export class RealTimeDataService {

  private bikeUrl = 'http://localhost:8005/getRealTimeDataForBike';
  private aqiUrl = 'http://localhost:8005/getRealTimeDataForAqi';
  private busUrl = 'http://localhost:8005/getRealTimeDataForBus';

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
    routeId: '',
    routeLong: '',
    routeShort: '',
    scheduledRelationship: '',
    startTimestamp: 0,
    stopSequence: [],
    tripId: '',
    _creationDate: '',
    _lastModifiedDate: ''
  };

  private aqiDataObjects: AqiData = {
    uid: 0,
    aqi: '',
    station: {name: '', geo: [], url: '', country: ''},
    time: {tz: '', stime: '', vtime: 0},
  };

  constructor(private http: HttpClient) {
  }

  // get real time bike data
  getRealTimeBikeData():Observable<any> {
    return new Observable((observer: Observer<any>) => {
      const eventSource = new EventSource(`${this.bikeUrl}` + "?Authorization=" + localStorage.getItem("token"));
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
      const eventSource = new EventSource(`${this.busUrl}` + "?Authorization=" + localStorage.getItem("token"));
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

  getRealTimeAqiData():Observable<any> {
    return new Observable((observer: Observer<any>) => {
      const eventSource = new EventSource(`${this.aqiUrl}` + "?Authorization=" + localStorage.getItem("token"));
      eventSource.onmessage = (event) => {
        const json = JSON.parse(event.data);
        this.aqiDataObjects = json;
        observer.next(this.aqiDataObjects);
      };
      eventSource.onerror = (error) => observer.error('eventSource.onerror: ' + error);
      return () => eventSource.close();
    });
  }

}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DublinBikesData } from '../models/DublinBikesData';
import { DublinBusData } from '../models/DublinBusData';
import { PedestrianData } from '../models/PedestrianData';
import { Observer } from 'rxjs';
import { AqiData } from '../models/AqiData';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class RealTimeDataService {

  // url endpoints for each data indicator
  private bikeUrl = 'http://' + environment.hostName + '/getRealTimeDataForBike';
  private aqiUrl = 'http://' + environment.hostName + '/getRealTimeDataForAqi';
  private pedestrianUrl = 'http://' + environment.hostName + '/getRealTimeDataForPedestrian';
  private busUrl = 'http://' + environment.hostName + '/getRealTimeDataForBus';
  urls = { "bike": this.bikeUrl, "aqi": this.aqiUrl, "ped": this.pedestrianUrl, "bus": this.busUrl };

  // models to map the real-time data
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
  
  private busDataObjects: DublinBusData = {
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
    station: { name: '', geo: [], url: '', country: '' },
    time: { tz: '', stime: '', vtime: 0 },
  };

  private pedestrianDataObjects: PedestrianData = {
    id: 0,
    street: '',
    count: 0,
    streetLatitude: 0,
    streetLongitude: 0,
    time: 0,
  };

  constructor(private http: HttpClient) {}

  /**
   * Gets the real time data from the backend for given data source
   *
   * @param {string} dataType
   * @returns {Observable<any>}
   */
  getRealTimeData(dataType: string): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      const eventSource = new EventSource(`${this.urls[dataType]}` + "?Authorization=" + localStorage.getItem("token"));
      eventSource.onmessage = (event) => {
        const json = JSON.parse(event.data);
        switch (dataType) {
          case "bike":
            this.dublinBikesDataObjects = json;
            observer.next(this.dublinBikesDataObjects);
            break;
          case "aqi":
            this.aqiDataObjects = json;
            observer.next(this.aqiDataObjects);
            break;
          case "ped":
            this.pedestrianDataObjects = json;
            observer.next(this.pedestrianDataObjects);
            break;
          case "bus":
            this.busDataObjects = json;
            observer.next(this.busDataObjects);
            break;
        }
      };
      eventSource.onerror = (error) => observer.error('eventSource.onerror: ' + error);
      return () => eventSource.close();
    });

  }

}
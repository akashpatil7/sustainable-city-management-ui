import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as EventSource from 'eventsource';
import { DublinBikesData } from '../models/DublinBikesData';
import { Observer } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RealTimeDataService {

  private baseUrl = 'http://localhost:7002/realTimeData';
  private dublinBikesDataObjectsList: DublinBikesData[] = new Array();

  constructor(private http: HttpClient) {
  }

  getRealTimeData():Observable<any> {
    this.dublinBikesDataObjectsList = new Array();
    return new Observable((observer: Observer<any>) => {
      const eventSource = new EventSource('${this.baseUrl}');
      eventSource.onmessage = (event) => {
        console.log('eventSource.onmessage: ', event);
        const json = JSON.parse(event.data);
        console.log(json);
        this.dublinBikesDataObjectsList.push(new DublinBikesData());
        observer.next(this.dublinBikesDataObjectsList);
      };
      eventSource.onerror = (error) => observer.error('eventSource.onerror: ' + error);
      return () => eventSource.close();
    });
  
  }
}
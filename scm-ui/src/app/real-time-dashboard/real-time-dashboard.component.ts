import { Component, OnInit, AfterViewInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RealTimeDataService } from '../services/real-time-data-service.service';
import {Observable, Observer} from 'rxjs';
import { DublinBikesData } from '../models/DublinBikesData';
import * as L from 'leaflet';

//import the code from the Leaflet API for creating marker icons
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-real-time-dashboard',
  templateUrl: './real-time-dashboard.component.html',
  styleUrls: ['./real-time-dashboard.component.css']
})
@Injectable()
export class RealTimeDashboardComponent implements OnInit {

  // array to store each Dublin bike data entry
  bikeData:DublinBikesData[] = [];
  // create a map object to display the data
  map:any;
  // object to hold map marker data
  markers: Object = {};
  
  lastUpdated:any;
  // variable to store loading status of real time data
  loadingData:boolean = true;
  // variable to hold search filter input
  searchText: string = '';
  
  constructor(private realTimeDataService: RealTimeDataService,private http:HttpClient) { }

  ngOnInit(): void {
  }

  // initialise the map after the html component is rendered
  ngAfterViewInit(): void {
    this.reloadData();
    this.initialiseMap();
  }

  reloadData() {
    this.realTimeDataService.getRealTimeData().subscribe({
      next: this.handleDataResponse.bind(this)
    });
  }

  objectKeys(obj:DublinBikesData){
    return Object.keys(obj);
   }

  handleDataResponse(data:any) {
    console.log(data)
    this.bikeData = data.bikeDTO
    this.lastUpdated = this.bikeData[0]["lastUpdate"];
    this.makeBikeMarkers();
    // for(let i=0; i < data.length; i++) {
    //   this.bikeData.push(data[i].bikeDTO)
    //   console.log(data[i].bikeDTO)
    // }
  }

// GET BIKE DATA FROM LOCAL FILE
/*
  getData() {
    // get snapshot of data from assets folder
    this.http.get('../assets/bikeData.json', {responseType: 'json'}).subscribe( (data) => {
      // store data in local list to display on HTML page
      this.bikeData = Object.values(data);
      // make map markers for the bike stand data
      this.makeBikeMarkers();
    })
  }
  */

  // set initial map configurations (Dublin city centre)
  initialiseMap(): void {
     this.map = L.map('map', {
       center: [53.35105167452323, -6.256029081676276],
       zoom: 14
     });

     const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          minZoom: 3,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });

      tiles.addTo(this.map);

   }

   // create a Dublin bike marker with given lat and lon
    makeBikeMarkers() {
      this.bikeData.forEach( (station) => {
        let marker = L.marker([station.latitude, station.longitude]);
        marker.bindPopup(this.makePopup(station));
        marker.addTo(this.map);
      });

    }

    // create selected popup Bike information for each marker
    makePopup(station:any): string {
      return `` +
        `<div>Name: ${ station.name }</div>` +
        `<div>Address: ${ station.address }</div>` +
        `<div>Available Bikes: ${ station.availableBikes }</div>` +
        `<div>Available Stands: ${ station.availableBikeStands }</div>` +
        `<div>Status: ${ station.status }</div>` +
        `<div>Last Updated: ${ station.lastUpdate }</div>`
    }

}

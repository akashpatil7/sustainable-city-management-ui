import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RealTimeDataService } from '../services/real-time-data-service.service';
import { DublinBikesData } from '../models/DublinBikesData';
import { DublinBusData } from '../models/DublinBusData';
import { MatRadioModule, MatRadioChange } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import * as L from 'leaflet';
import { AqiData } from '../models/AqiData';
import { PedestrianData } from '../models/PedestrianData';

//import the code from the Leaflet API for creating marker icons
const blueIcon = L.icon({
  iconRetinaUrl: 'assets/marker-icon-2x.png',
  iconUrl: 'assets/marker-icon-2x.png',
  shadowUrl: 'assets/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

const redIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'assets/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});


@Component({
  selector: 'app-real-time-dashboard',
  templateUrl: './real-time-dashboard.component.html',
  styleUrls: ['./real-time-dashboard.component.css']
})
@Injectable()
export class RealTimeDashboardComponent implements OnInit {

  // arrays to store each real time data indicator
  bikeData:DublinBikesData[] = [];
  busData:DublinBusData[] = [];
  aqiData:AqiData[] = [];
  pedestrianData: PedestrianData[] = [];

  // create a map object to display the data
  map: any;

  // objects to hold bike markers
  bikeMarkers: Object = {};
  pedestrianMarkers: Object = {};
  busMarkers:Object = {}
  aqiMarkers: Object = {};
  
  // variables to store loading status of real time data
  lastUpdated:any;
  loadingData:boolean = true;
  
  // variables to hold search filter inputs
  searchText: string = '';
  busSearchText: string = '';
  aqiSearchText: string = '';
  pedestrianSearchText: string = '';

  // variables to store selected data filters
  bikeFilterChoice:string = '';
  aqiFilterChoice:string = '';
  busFilterChoice:string = '';
  pedestrianFilterChoice: string = '';
  
  // data filter options
  bikeFilterOptions:string[] = ['Station Name', 'Last Updated', 'Available Bikes', 'Available Bike Stands'];
  busFilterOptions:string[] = ['Route', 'Start Time'];
  aqiOptions:string[] = ['Station Name', 'Last Updated', 'Aqi'];
  pedestrianOptions: string[] = ['Street Name', 'Number of Pedestrians']
  
  // variables to hold map data checkbox values
  showBikeMarkers: boolean = true;
  showPedestrianMarkers: boolean = true;
  showBusMarkers: boolean = true;
  showAqiMarkers: boolean = true;

  // array to store Pedestrian data 
  streetLatLon:any[] = [];
  
  // array to store Dublin bus stop coordinates
  dublinBusStops: any[] = []

  constructor(private realTimeDataService: RealTimeDataService, private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  // initialise the map after the html component is rendered and get real-time data
  ngAfterViewInit() {
    this.getData();
    this.initialiseMap();
  }

  ngAfterContentInit(): void {
    this.loadingData = false;
  }
  
  // set initial map configurations (Dublin city centre)
  initialiseMap(): void {
     this.map = L.map('map', {
       center: [53.35105167452323, -6.256029081676276],
       zoom: 13,
       preferCanvas: true
     });

     const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          minZoom: 3,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });

      tiles.addTo(this.map);
   }

  async getData() {
    this.realTimeDataService.getRealTimeData("bike").subscribe({
      next: this.handleBikeResponse.bind(this)
    });
    this.realTimeDataService.getRealTimeData("aqi").subscribe({
      next: this.handleAqiResponse.bind(this)
    });
    this.realTimeDataService.getRealTimeData("ped").subscribe({
      next: this.handlePedestrianResponse.bind(this)
    });
    this.realTimeDataService.getRealTimeData("bus").subscribe({
      next: this.handleBusResponse.bind(this)
    })
    // get bus stop geo data
    await this.http.get('../assets/DBus_Stops.json', {responseType: 'json'}).subscribe( (data:any) => {
      this.dublinBusStops = data;
      this.makeBusMarkers();
    });
  }

  handleAqiResponse(data: any) {
    this.aqiData = data
    this.makeAqiMarkers();
  }

  handlePedestrianResponse(data: any) {
    this.pedestrianData = data
    this.makePedestrianMarkers();
  }

  handleBikeResponse(data: DublinBikesData[]) {
    this.bikeData = data
    this.lastUpdated = this.bikeData[0]["last_update"];

    // alphabetise bike data by station name
    this.bikeData.sort(function (a, b) {
      if (a.name < b.name) { return -1; }
      if (a.name > b.name) { return 1; }
      return 0;
    });

    // get most up to date timestamp
    this.bikeData.forEach(bike => {
      if (bike.last_update > this.lastUpdated) { this.lastUpdated = bike.last_update }
    })
    this.makeBikeMarkers();
  }
  
  // save real time bus data
  handleBusResponse(data:any) {
    this.busData = data
    // sort bus data by route name
    this.busData.sort(function(a, b){
        if(a.routeShort < b.routeShort) { return -1; }
        if(a.routeShort > b.routeShort) { return 1; }
        return 0;
    });
    this.makeBusPopup();
  }

 // create a Dublin bike marker with given lat and lon
  makeBikeMarkers() {
    this.bikeData.forEach( (station) => {
      // upate existing marker's popup with new real time information
      if(this.bikeMarkers[station.name]) {
        let marker = this.bikeMarkers[station.name];
        marker.bindPopup(this.makeBikePopup(station));
      }
      // create a new marker if data is coming through first time
      else {
        let marker = L.marker([station.latitude, station.longitude], {icon: blueIcon});
        marker.bindPopup(this.makeBikePopup(station));
        this.bikeMarkers[station.name] = marker;
        marker.addTo(this.map);
      }
    });
  }

  // create an aqi marker with given lat and lon
  makeAqiMarkers() {
    this.aqiData.forEach((aqi) => {
      if(this.aqiMarkers[aqi.uid]) {
        let marker = this.aqiMarkers[aqi.uid];
        marker.bindPopup(this.makeAqiPopup(aqi));
      }
      else {
        let marker = L.marker([aqi.station.geo[0], aqi.station.geo[1]], { icon: redIcon });
        marker.bindPopup(this.makeAqiPopup(aqi));
        marker.addTo(this.map);
        this.aqiMarkers[aqi.uid] = marker;
      }
    });
  }

  // create a Pedestrian marker with the size scaled to the amount of people in the area
  makePedestrianMarkers() {
    this.pedestrianData.forEach((pedestrian) => {
      if(this.pedestrianMarkers[pedestrian.street]) {
        let marker = this.pedestrianMarkers[pedestrian.street];
        marker.bindPopup(this.makePedestrianPopup(pedestrian));
      }
      else {
        let radius = this.scaleCircleMarker(pedestrian["count"]);
        let marker = L.circleMarker([pedestrian["streetLatitude"], pedestrian["streetLongitude"]], { radius: radius }).setStyle({ color: 'yellow' });
        marker.bindPopup(this.makePedestrianPopup(pedestrian));
        marker.addTo(this.map);
        this.pedestrianMarkers[pedestrian.street] = marker;
      }
    })
  }

  // scale the pedestrian marker based on the number of people
  scaleCircleMarker(pedestrians: number): number {
    if (pedestrians)
      return ((pedestrians - 0) / (3000 - 0)) * (30 - 5) + 5
    else
      return 0;
  }

  // create a bus marker for each bus stop
  makeBusMarkers() {
    this.dublinBusStops.forEach((stop: any) => {
      let marker = L.circleMarker([stop["stop_lat"], stop["stop_lon"]], { radius: 5, color: 'green' });
      marker.bindPopup(`<div> <b> ${stop.stop_name} </b></div>`);
      marker.addTo(this.map);
      this.busMarkers[stop.stop_name] = marker;
    });
  }

  // create selected popup Bike information for each marker
  makeBikePopup(station: any): string {
    return `` +
      `<div>Name: ${station.name}</div>` +
      `<div>Address: ${station.address}</div>` +
      `<div>Available Bikes: ${station.available_bikes}</div>` +
      `<div>Available Stands: ${station.available_bike_stands}</div>` +
      `<div>Status: ${station.status}</div>` +
      `<div>Last Updated: ${station.last_update}</div>`
  }

  // create selected popup Aqi information for each marker
  makeAqiPopup(aqi: any): string {
    return `` +
      `<div>Name: ${aqi.station.name}</div>` +
      `<div>Aqi: ${aqi.aqi}</div>` +
      `<div>Last Updated: ${aqi.time.stime}</div>`
  }

  // create selected popup Bike information for each marker
  makePedestrianPopup(street: any): string {
    let streetNames = street["street"].split("/");
    return `` +
      `<div>Street: ${streetNames[0]}</div>` +
      `<div>Area: ${streetNames[streetNames.length - 1]}</div>` +
      `<div>Number of people: ${street.count}</div>`
  }
  
  makeBusPopup() {
    //TODO: figure out what data we want to show
  }


  // sort the bike table data based on selected filter
  setBikeFilter($event: MatRadioChange) {
    let dataAttr = ''
    switch ($event.value) {
      case 'Station Name':
        dataAttr = "name";
        break;
      case 'Last Updated':
        dataAttr = "last_update";
        break;
      case 'Available Bikes':
        dataAttr = "available_bikes";
        break;
      case 'Available Bike Stands':
        dataAttr = "available_bike_stands";
        break;

    }
    this.bikeData.sort(function (a, b) {
      if (a[dataAttr] < b[dataAttr]) { return -1; }
      if (a[dataAttr] > b[dataAttr]) { return 1; }
      return 0;
    });
  }

  // sort the bike table data based on selected filter
  setAqiFilter($event: MatRadioChange) {
    let dataAttr = ''
    let innerAttr = ''
    switch ($event.value) {
      case 'Station Name':
        dataAttr = "station";
        innerAttr = "name";
        break;
      case 'Last Updated':
        dataAttr = "time";
        innerAttr = "stime";
        break;
      case 'Aqi':
        dataAttr = "aqi";
        break;
    }
    this.aqiData.sort(function (a, b) {
      let aVal = a[dataAttr];
      let bVal = b[dataAttr];
      if (innerAttr != '') {
        aVal = aVal[innerAttr];
        bVal = bVal[innerAttr];
      }
      if (aVal < bVal) { return -1; }
      if (aVal > bVal) { return 1; }
      return 0;
    });
  }
  
  setBusFilter($event: MatRadioChange) {
    let dataAttr = ''
    switch ($event.value) {
      case 'Route':
        dataAttr = "routeShort";
        break;
      case 'Start Time':
        dataAttr = "startTimestamp";
        break;
    }
    this.busData.sort(function (a, b) {
      if (a[dataAttr] < b[dataAttr]) { return -1; }
      if (a[dataAttr] > b[dataAttr]) { return 1; }
      return 0;
    });
    
  }

  // sort the pedestrian table data based on selected filter
  setPedestrianFilter($event: MatRadioChange) {
    let dataAttr = ''
    switch ($event.value) {
      case 'Street Name':
        dataAttr = "street";
        break;
      case 'Number of Pedestrians':
        dataAttr = "count";
        break;
    }
    this.pedestrianData.sort(function (a, b) {
      if (a[dataAttr] < b[dataAttr]) { return -1; }
      if (a[dataAttr] > b[dataAttr]) { return 1; }
      return 0;
    });
  }

  // show or remove map pins based on filter values
  setMapFilter() {
    if (this.showBikeMarkers) {
      Object.values(this.bikeMarkers).forEach(marker => { this.map.addLayer(marker) })
    }
    else {
      Object.values(this.bikeMarkers).forEach(marker => { this.map.removeLayer(marker) })
    }

    if (this.showPedestrianMarkers) {
      Object.values(this.pedestrianMarkers).forEach(marker => { this.map.addLayer(marker) })

    }
    else {
      Object.values(this.pedestrianMarkers).forEach(marker => { this.map.removeLayer(marker) })
    }

    if (this.showBusMarkers) {
      Object.values(this.busMarkers).forEach(marker => { this.map.addLayer(marker) })

    }
    else {
      Object.values(this.busMarkers).forEach(marker => { this.map.removeLayer(marker) })
    }

    if (this.showAqiMarkers) {
      Object.values(this.aqiMarkers).forEach(marker => { this.map.addLayer(marker) })
    }
    else {
      Object.values(this.aqiMarkers).forEach(marker => { this.map.removeLayer(marker) })
    }
  }

}

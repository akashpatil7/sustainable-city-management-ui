import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RealTimeDataService } from '../services/real-time-data-service.service';
import { DublinBikesData } from '../models/DublinBikesData';
import { MatRadioChange } from '@angular/material/radio';
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

  // array to store each Dublin bike data entry
  bikeData: DublinBikesData[] = [];

  aqiData: AqiData[] = [];

  pedestrianData: PedestrianData[] = [];

  // create a map object to display the data
  map: any;

  // objects to hold bike markers
  bikeMarkers: Object[] = [];
  pedestrianMarkers: Object[] = [];
  busMarkers: Object[] = []
  aqiMarkers: Object[] = []

  lastUpdated: any;
  // variable to store loading status of real time data
  loadingData: boolean = true;
  // variable to hold search filter input
  searchText: string = '';
  // variable to hold search filter input
  aqiSearchText: string = '';
  pedestrianSearchText: string = '';
  // variable to store selected data filter
  bikeFilterChoice: string = '';
  // variable to store selected data filter
  aqiFilterChoice: string = '';
  pedestrianFilterChoice: string = '';
  // data filter options
  filterOptions: string[] = ['Station Name', 'Last Updated', 'Available Bikes', 'Available Bike Stands'];
  aqiOptions: string[] = ['Station Name', 'Last Updated', 'Aqi'];
  pedestrianOptions: string[] = ['Street Name', 'Number of Pedestrians']

  // variables to hold map data checkbox values
  showBikeMarkers: boolean = true;
  showPedestrianMarkers: boolean = true;
  showBusMarkers: boolean = true;
  showAqiMarkers: boolean = true;

  // array to store Dublin bus stop coordinates
  dublinBusStops: any[] = []


  constructor(private realTimeDataService: RealTimeDataService, private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  // initialise the map after the html component is rendered and get real-time data
  ngAfterViewInit(): void {
    this.getData();
    this.initialiseMap();
    this.getDublinBusData();
  }

  ngAfterContentInit(): void {
    this.loadingData = false;
  }

  getData() {
    this.realTimeDataService.getRealTimeData("bike").subscribe({
      next: this.handleBikeResponse.bind(this)
    });
    this.realTimeDataService.getRealTimeData("aqi").subscribe({
      next: this.handleAqiResponse.bind(this)
    });
    this.realTimeDataService.getRealTimeData("ped").subscribe({
      next: this.handlePedestrianResponse.bind(this)
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

  // GET DUBLIN BUS DATA FROM LOCAL FILE
  getDublinBusData() {
    // get real-time schedule data
    this.http.get('../assets/busData.json', { responseType: 'json' }).subscribe((data: any) => {
      let test = this.filterBusData(data)
    });

    // get stop geo data
    this.http.get('../assets/DBus_Stops.json', { responseType: 'json' }).subscribe((data: any) => {
      this.dublinBusStops = data;
      this.makeBusMarkers();
    });
  }

  // find the schedule data for a given stop ID
  filterBusData(object) {
    if (object.hasOwnProperty('StopId') && object["StopId"] == "7010B158241")
      return object;

    for (let i = 0; i < Object.keys(object).length; i++) {
      if (typeof object[Object.keys(object)[i]] == "object") {
        let o: any = this.filterBusData(object[Object.keys(object)[i]]);
        if (o != null)
          return o;
      }
    }
    return null;
  }

  // create a Dublin bike marker with given lat and lon
  makeBikeMarkers() {
    this.bikeData.forEach((station) => {
      let marker = L.marker([station.latitude, station.longitude], { icon: blueIcon });
      marker.bindPopup(this.makeBikePopup(station));
      marker.addTo(this.map);
      this.bikeMarkers.push(marker);
    });
  }

  // create an aqi marker with given lat and lon
  makeAqiMarkers() {
    this.aqiData.forEach((aqi) => {
      let marker = L.marker([aqi.station.geo[0], aqi.station.geo[1]], { icon: redIcon });
      marker.bindPopup(this.makeAqiPopup(aqi));
      marker.addTo(this.map);
      this.aqiMarkers.push(marker);
    });
  }

  // create a Pedestrian marker with the size scaled to the amount of people in the area
  makePedestrianMarkers() {
    this.pedestrianData.forEach((pedestrian) => {
      let radius = this.scaleCircleMarker(pedestrian["count"]);
      let marker = L.circleMarker([pedestrian["streetLatitude"], pedestrian["streetLongitude"]], { radius: radius }).setStyle({ color: 'yellow' });
      marker.bindPopup(this.makePedestrianPopup(pedestrian));
      marker.addTo(this.map);
      this.pedestrianMarkers.push(marker);
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
      marker.bindPopup(this.makeBusPopup(stop));
      marker.addTo(this.map);
      this.busMarkers.push(marker);
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

  // create selected popup Bus information for each marker
  makeBusPopup(stop: any): string {
    let names = stop["stop_name"].split(',')
    return `` +
      `<div> ${names[1]} </div>` +
      `<div> Name: ${names[0]} </div>`
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
      this.bikeMarkers.forEach(marker => { this.map.addLayer(marker) })
    }
    else {
      this.bikeMarkers.forEach(marker => { this.map.removeLayer(marker) })
    }

    if (this.showPedestrianMarkers) {
      this.pedestrianMarkers.forEach(marker => { this.map.addLayer(marker) })

    }
    else {
      this.pedestrianMarkers.forEach(marker => { this.map.removeLayer(marker) })
    }

    if (this.showBusMarkers) {
      this.busMarkers.forEach(marker => { this.map.addLayer(marker) })

    }
    else {
      this.busMarkers.forEach(marker => { this.map.removeLayer(marker) })
    }

    if (this.showAqiMarkers) {
      this.aqiMarkers.forEach(marker => { this.map.addLayer(marker) })
    }
    else {
      this.aqiMarkers.forEach(marker => { this.map.removeLayer(marker) })
    }
  }

}

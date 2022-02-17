import { Component, OnInit, AfterViewInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RealTimeDataService } from '../services/real-time-data-service.service';
import {Observable, Observer} from 'rxjs';
import { DublinBikesData } from '../models/DublinBikesData';
import * as L from 'leaflet';

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

const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
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
  bikeData:DublinBikesData[] = [];
  // create a map object to display the data
  map:any;
  // object to hold map marker data
  markers: Object = {};
  // variable to store timestamp of data retrieval
  lastUpdated:any;
  // variable to store loading status of real time data
  loadingData:boolean = true;
  // array to store Pedestrian data 
  streetLatLon:any[] = [];
  // array to store Dublin bus stop coordinates
  dublinBusStops:any[] = []
  
  constructor(private realTimeDataService: RealTimeDataService,private http:HttpClient) { }

  ngOnInit(): void {
  }

  // initialise the map after the html component is rendered and get real-time data
  ngAfterViewInit(): void {
    this.getBikeData();
    this.initialiseMap();
    this.getPedestrianData();
    this.getDublinBusData();
  }
  
  ngAfterContentInit(): void {
    this.loadingData = false;
  }

  getBikeData() {
    this.realTimeDataService.getRealTimeData().subscribe({
      next: this.handleDataResponse.bind(this)
    });
  }

  handleDataResponse(data:any) {
    this.bikeData = data.bikeDTO
    this.lastUpdated = this.bikeData[0]["lastUpdate"];
    // alphabetise bike data by station name
    this.bikeData.sort(function(a, b){
        if(a.name < b.name) { return -1; }
        if(a.name > b.name) { return 1; }
        return 0;
    });
    
    // get most up to date timestamp
    this.bikeData.forEach( bike => {
      if(bike.lastUpdate > this.lastUpdated) { this.lastUpdated = bike.lastUpdate}
    })

    this.makeBikeMarkers();

  }
  
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

// GET PEDESTRIAN DATA FROM LOCAL FILE
  getPedestrianData() {
    // get snapshot of data from assets folder
    this.http.get('../assets/DublinStreetsLatLon.json', {responseType: 'json'}).subscribe( (data:any) => {
      // store data in local list to display on HTML page
      this.streetLatLon = data;
      // split the street data by street name and area
      this.streetLatLon.forEach( street => {
        let streetNames = street["A"].split("/");
        street["A"] = streetNames[0]
        street["D"] = streetNames[streetNames.length-1];
      
      })
      // get pedestrian numbers from open data (currently stored locally)
      this.http.get('../assets/pedestrian2022.json', {responseType: 'json'}).subscribe( (data:any) => {
        console.log(data[data.length-1])
        let populationSizeData = data[data.length-1];
        this.streetLatLon.forEach(street => {
          let population:any = populationSizeData[street["A"]][street["D"]]
          street["E"] = population
        })
        
        // make map markers for the pedestrian data
        this.makePedestrianMarkers();
      });
    });
    
  }
  
  // GET DUBLIN BUS DATA FROM LOCAL FILE
  getDublinBusData() {
    // get real-time schedule data
    this.http.get('../assets/busData.json', {responseType: 'json'}).subscribe( (data:any) => {
      let test = this.filterBusData(data)
      console.log(test);
    });

    // get stop geo data
    this.http.get('../assets/DBus_Stops.json', {responseType: 'json'}).subscribe( (data:any) => {
      this.dublinBusStops = data;
      this.makeBusMarkers();
    });
  }
  
  // find the schedule data for a given stop ID
  filterBusData(object){
      if(object.hasOwnProperty('StopId') && object["StopId"] == "7010B158241")
          return object;

      for(let i=0; i<Object.keys(object).length; i++){
          if(typeof object[Object.keys(object)[i]] == "object"){
              let o:any = this.filterBusData(object[Object.keys(object)[i]]);
              if(o != null)
                  return o;
          }
      }
      return null;
  }

   // create a Dublin bike marker with given lat and lon
    makeBikeMarkers() {
      this.bikeData.forEach( (station) => {
        let marker = L.marker([station.latitude, station.longitude], {icon: blueIcon});
        marker.bindPopup(this.makeBikePopup(station));
        marker.addTo(this.map);
      });
    }
    
    // create a Pedestrian marker with the size scaled to the amount of people in the area
    makePedestrianMarkers() {
      this.streetLatLon.forEach( (street:any) => {
        let radius = this.scaleCircleMarker(street["E"]);
        let marker = L.circleMarker([street["B"], street["C"]], {radius: radius}).setStyle({color: 'red'});
        marker.bindPopup(this.makePedestrianPopup(street));
        marker.addTo(this.map);
      })
    }
    
    // scale the population marker based on the number of people
    scaleCircleMarker(population: number):number {
      if(population)
        return ((population - 0) / (3000-0)) * (30-5) + 5
      else
        return 0;
    }
    
    // create a bus marker for each bus stop
    makeBusMarkers() {
      this.dublinBusStops.forEach( (stop:any) => {
        let marker = L.marker([stop["stop_lat"], stop["stop_lon"]], {icon: greenIcon});
        marker.bindPopup(this.makeBusPopup(stop));
        marker.addTo(this.map);
      });
    }
    
    // create selected popup Bike information for each marker
    makeBikePopup(station:any): string {
      return `` +
        `<div>Name: ${ station.name }</div>` +
        `<div>Address: ${ station.address }</div>` +
        `<div>Available Bikes: ${ station.availableBikes }</div>` +
        `<div>Available Stands: ${ station.availableBikeStands }</div>` +
        `<div>Status: ${ station.status }</div>` +
        `<div>Last Updated: ${ station.lastUpdate }</div>`
    }
    
    // create selected popup Bike information for each marker
    makePedestrianPopup(street:any): string {
      return `` +
        `<div>Street: ${ street.A }</div>` +
        `<div>Area: ${ street.D }</div>` +
        `<div>Number of people: ${ street.E }</div>`
    }
    
    // create selected popup Bus information for each marker
    makeBusPopup(stop:any): string {
      let names = stop["stop_name"].split(',')
      return `` +
      `<div> ${ names[1]} </div>` +
      `<div> Name: ${ names[0] } </div>`
    }

}

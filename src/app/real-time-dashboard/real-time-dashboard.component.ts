import { Component, OnInit, AfterViewInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RealTimeDataService } from '../services/real-time-data-service.service';
import { Observable, Observer } from 'rxjs';
import { DublinBikesData } from '../models/DublinBikesData';
import { DublinBusData } from '../models/DublinBusData';
import { MatRadioModule, MatRadioChange } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import * as L from 'leaflet';
import { AqiData } from '../models/AqiData';

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
  busData:DublinBusData[] = [];
  aqiData:AqiData[] = [];

  // create a map object to display the data
  map:any;
  
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

  // variables to store selected data filters
  filterChoice:string = '';
  aqiFilterChoice:string = '';
  busFilterChoice:string = '';
  
  // data filter options
  filterOptions:string[] = ['Station Name', 'Last Updated', 'Available Bikes', 'Available Bike Stands'];
  busFilterOptions:string[] = ['Route', 'Start Time'];
  aqiOptions:string[] = ['Station Name', 'Last Updated', 'Aqi'];
  
  // variables to hold map data checkbox values
  showBikeMarkers:boolean = true;
  showPedestrianMarkers:boolean = true;
  showBusMarkers:boolean = true;
  showAqiMarkers:boolean = true;

  // array to store Pedestrian data 
  streetLatLon:any[] = [];
  
  // array to store Dublin bus stop coordinates
  dublinBusStops:any[] = []

  
  constructor(private realTimeDataService: RealTimeDataService,private http:HttpClient) {
  }

  ngOnInit(): void {
  }

  // initialise the map after the html component is rendered and get real-time data
  ngAfterViewInit() {
    this.getBikeData();
    this.getPedestrianData();
    this.getDublinBusData();
    this.getAqiData();
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

  // get real time bike data 
  getBikeData() {
    this.realTimeDataService.getRealTimeBikeData().subscribe({
      next: this.handleBikeResponse.bind(this)
    });
  }

  
  handleBikeResponse(data:any) {
    this.bikeData = data
    this.lastUpdated = this.bikeData[0]["last_update"];
    // alphabetise bike data by station name
    this.bikeData.sort(function(a, b){
        if(a.name < b.name) { return -1; }
        if(a.name > b.name) { return 1; }
        return 0;
    });
    
    // get most up to date timestamp
    this.bikeData.forEach( bike => {
      if(bike.last_update > this.lastUpdated) { this.lastUpdated = bike.last_update}
    })

    this.makeBikeMarkers();
  }

  getAqiData() {
    this.realTimeDataService.getRealTimeAqiData().subscribe({
      next: this.handleAqiResponse.bind(this)
    });
  }

  handleAqiResponse(data:any) {
    this.aqiData = data
    this.makeAqiMarkers();
  }

  
  // Get Dublin Bus data from service and stop data from file
  async getDublinBusData() {
    this.realTimeDataService.getRealTimeBusData().subscribe({
      next: this.handleBusResponse.bind(this)
    });
    
    // get stop geo data
    await this.http.get('../assets/DBus_Stops.json', {responseType: 'json'}).subscribe( (data:any) => {
      this.dublinBusStops = data;
      this.makeBusMarkers();
    });
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


// GET PEDESTRIAN DATA FROM LOCAL FILE
  getPedestrianData() {
    /*
    // get snapshot of data from assets folder
    this.http.get('../assets/DublinStreetsLatLon.json', {responseType: 'json'}).subscribe( (data:any) => {
      // store data in local list to display on HTML page
      this.streetLatLon = data;
      // split the street data by street name and area
      this.streetLatLon.forEach( street => {
        let streetNames = street["streetName"].split("/");
        street["streetName"] = streetNames[0]
        street["streetSubName"] = streetNames[streetNames.length-1];
      
      })
      // get pedestrian numbers from open data (currently stored locally)
      this.http.get('../assets/pedestrian2022.json', {responseType: 'json'}).subscribe( (data:any) => {
        // get most recent dataset (i.e. last entry in file)
        let pedestrianSizeData = data[data.length-1];
        this.streetLatLon.forEach(street => {
          let pedestrianAmount:any = pedestrianSizeData[street["streetName"]][street["streetSubName"]]
          street["pedestrians"] = pedestrianAmount
        })
        
        // make map markers for the pedestrian data
        this.makePedestrianMarkers();
      });
    });
    */
    
  }

   // create a Dublin bike marker with given lat and lon
    makeBikeMarkers() {
      this.bikeData.forEach( (station) => {
        if(this.bikeMarkers[station.name]) {
          let marker = this.bikeMarkers[station.name];
          marker.bindPopup(this.makeBikePopup(station));
        }
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
    this.aqiData.forEach( (aqi) => {
      let marker = L.marker([aqi.station.geo[0], aqi.station.geo[1]], {icon: redIcon});
      marker.bindPopup(this.makeAqiPopup(aqi));
      marker.addTo(this.map);
      this.aqiMarkers[aqi.uid] = marker;
    });
  }
    
    // create a Pedestrian marker with the size scaled to the amount of people in the area
    makePedestrianMarkers() {
      this.streetLatLon.forEach( (street:any) => {
        if(this.pedestrianMarkers[street]) {
          let marker = this.pedestrianMarkers[street];
          marker.bindPopup(this.makePedestrianPopup(street));
        }
        else {
          let radius = this.scaleCircleMarker(street["count"]);
          let marker = L.circleMarker([street["streetLatitude"], street["streetLongitude"]], {radius: radius}).setStyle({color: 'yellow'});
          marker.bindPopup(this.makePedestrianPopup(street));
          marker.addTo(this.map);
        }
      });
    }
    
    // scale the pedestrian marker based on the number of people
    scaleCircleMarker(pedestrians: number):number {
      if(pedestrians)
        return ((pedestrians - 0) / (3000-0)) * (30-5) + 5
      else
        return 0;
    }
    
    // create a bus marker for each bus stop
    makeBusMarkers() {
      this.dublinBusStops.forEach( (stop:any) => {
        let marker = L.circleMarker([stop["stop_lat"], stop["stop_lon"]], {radius:5, color: 'green'});
        marker.addTo(this.map);
        marker.bindPopup(`<div style="text-align:center"> <b>${ stop["stop_name"] }</b> </div>`)
        this.busMarkers[stop["stop_id"]] = marker;
      });
    
    }
    
    // create selected popup Bike information for each marker
    makeBikePopup(station:any): string {
      return `` +
        `<div>Name: ${ station.name }</div>` +
        `<div>Address: ${ station.address }</div>` +
        `<div>Available Bikes: ${ station.available_bikes }</div>` +
        `<div>Available Stands: ${ station.available_bike_stands }</div>` +
        `<div>Status: ${ station.status }</div>` +
        `<div>Last Updated: ${ station.last_update }</div>`
    }

   // create selected popup Aqi information for each marker
   makeAqiPopup(aqi:any): string {
    return `` +
      `<div>Name: ${ aqi.station.name }</div>` +
      `<div>Aqi: ${ aqi.aqi }</div>` +
      `<div>Last Updated: ${ aqi.time.stime }</div>`
  }

    // create selected popup Bike information for each marker
    makePedestrianPopup(street:any): string {
      return `` +
        `<div>Street: ${ street.streetName }</div>` +
        `<div>Area: ${ street.streetSubName }</div>` +
        `<div>Number of people: ${ street.pedestrians }</div>`
    }
    
    makeBusPopup() {
      // TODO: figure out what data to show
    }
    
    // sort the bike table data based on selected filter
    setDataFilter($event: MatRadioChange) {
        console.log($event.source.name, $event.value);
        // filter by station name
        if ($event.value === 'Station Name') {
          this.bikeData.sort(function(a, b){
              if(a.name < b.name) { return -1; }
              if(a.name > b.name) { return 1; }
              return 0;
          });
        }
        // filter by last updated
        if ($event.value === 'Last Updated') {
          this.bikeData.sort(function(a, b){
              if(a.last_update < b.last_update) { return 1; }
              if(a.last_update > b.last_update) { return -1; }
              return 0;
          });
        }
        // filter by available bikes
        if ($event.value === 'Available Bikes') {
          this.bikeData.sort(function(a, b){
              if(a.available_bikes < b.available_bikes) { return 1; }
              if(a.available_bikes > b.available_bikes) { return -1; }
              return 0;
          });
        }
        // filter by available bike stands
        if ($event.value === 'Available Bike Stands') {
          this.bikeData.sort(function(a, b){
              if(a.available_bike_stands < b.available_bike_stands) { return 1; }
              if(a.available_bike_stands > b.available_bike_stands) { return -1; }
              return 0;
          });
        }
    }

      // sort the bike table data based on selected filter
      setAqiFilter($event: MatRadioChange) {
        console.log($event.source.name, $event.value);
        // filter by station name
        if ($event.value === 'Station Name') {
          this.aqiData.sort(function(a, b){
              if(a.station.name < b.station.name) { return -1; }
              if(a.station.name > b.station.name) { return 1; }
              return 0;
          });
        }
        // filter by last updated
        if ($event.value === 'Last Updated') {
          this.aqiData.sort(function(a, b){
              if(a.time.stime < b.time.stime) { return 1; }
              if(a.time.stime > b.time.stime) { return -1; }
              return 0;
          });
        }
        // filter by available bikes
        if ($event.value === 'Aqi') {
          this.aqiData.sort(function(a, b){
              if(a.aqi < b.aqi) { return 1; }
              if(a.aqi > b.aqi) { return -1; }
              return 0;
          });
        }
    }
    
    // show or remove map pins based on filter values
    setMapFilter() {
      
      if(this.showBikeMarkers) {
        Object.values(this.bikeMarkers).forEach(marker => {
          this.map.addLayer(marker)
        })
        
      }
      if(!this.showBikeMarkers) {
        Object.values(this.bikeMarkers).forEach(marker => {
          this.map.removeLayer(marker)
        })
      }
      
      if(this.showPedestrianMarkers) {
        Object.values(this.pedestrianMarkers).forEach(marker => {
          this.map.addLayer(marker)
        })
        
      }
      if(!this.showPedestrianMarkers) {
        Object.values(this.pedestrianMarkers).forEach(marker => {
          this.map.removeLayer(marker)
        })
      }
      
      if(this.showBusMarkers) {
        Object.values(this.busMarkers).forEach(marker => {
          this.map.addLayer(marker)
        })
        
      }
      if(!this.showBusMarkers) {
        Object.values(this.busMarkers).forEach(marker => {
          this.map.removeLayer(marker)
        })
      }
      if(this.showAqiMarkers) {
        Object.values(this.aqiMarkers).forEach(marker => {
          this.map.addLayer(marker)
        })
        
      }
      if(!this.showAqiMarkers) {
        Object.values(this.aqiMarkers).forEach(marker => {
          this.map.removeLayer(marker)
        })
      }
    }

}

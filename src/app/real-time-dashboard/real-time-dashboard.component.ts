import { Component, OnInit, AfterViewInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RealTimeDataService } from '../services/real-time-data-service.service';
import { Observable, Observer } from 'rxjs';
import { DublinBikesData } from '../models/DublinBikesData';
import { DublinBusData } from '../models/DublinBusData';
import { MatRadioModule, MatRadioChange } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
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
  busData:DublinBusData[] = [];
  // create a map object to display the data
  map:any;
  
  // objects to hold bike markers
  bikeMarkers: Object[] = [];
  pedestrianMarkers: Object[] = [];
  busMarkers:Object = {}
  airQualityMarkers: Object[] = [];
  
  lastUpdated:any;
  // variable to store loading status of real time data
  loadingData:boolean = true;
  // variable to hold search filter input
  searchText: string = '';
  // variable to store selected data filter
  filterChoice:string = '';
  // data filter options
  filterOptions:string[] = ['Station Name', 'Last Updated', 'Available Bikes', 'Available Bike Stands'];
  
  // variables to hold map data checkbox values
  showBikeMarkers:boolean = true;
  showPedestrianMarkers:boolean = true;
  showBusMarkers:boolean = true;
  showAirQualityMarkers:boolean = false;

  // array to store Pedestrian data 
  streetLatLon:any[] = [];
  // array to store Dublin bus stop coordinates
  dublinBusStops:any[] = []

  
  constructor(private realTimeDataService: RealTimeDataService,private http:HttpClient) {
  }

  ngOnInit(): void {
  }

  // initialise the map after the html component is rendered and get real-time data
  ngAfterViewInit(): void {
    this.getBikeData();
    this.getPedestrianData();
    this.getDublinBusData();
    this.initialiseMap();
  }
  
  ngAfterContentInit(): void {
    this.loadingData = false;
  }

  // get real time bike data 
  getBikeData() {
    this.realTimeDataService.getRealTimeBikeData().subscribe({
      next: this.handleBikeDataResponse.bind(this)
    });
  }

  // save real time bike data to array and sort alphabetically
  handleBikeDataResponse(data:any) {
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
    console.log(this.bikeData);
    //console.log("BIKE DATA: ", this.bikeData);
    this.makeBikeMarkers();
  }
  
  // GET DUBLIN BUS DATA FROM LOCAL FILE
  async getDublinBusData() {
    /*
    this.realTimeDataService.getRealTimeBusData().subscribe({
      next: this.handleBusDataResponse.bind(this)
    });
    */
    // get real-time schedule data
    
    
    let data = await this.http.get<Array<DublinBusData>>('../assets/busData.json', {responseType: 'json'}).toPromise()!;
    this.busData = data!;
    
    // get stop geo data
    await this.http.get('../assets/DBus_Stops.json', {responseType: 'json'}).subscribe( (data:any) => {
      this.dublinBusStops = data;
      this.makeBusMarkers();
      this.makeBusPopup();
    });

  }
  
  // save real time bus data
  handleBusDataResponse(data:any) {
    this.busData = data
    console.log(this.busData);
    this.makeBusMarkers();
    this.makeBusPopup();
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
    
  }
  
  // find the schedule data for a given stop ID
  /*
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
  */

   // create a Dublin bike marker with given lat and lon
    makeBikeMarkers() {
      this.bikeData.forEach( (station) => {
        let marker = L.marker([station.latitude, station.longitude], {icon: blueIcon});
        marker.bindPopup(this.makeBikePopup(station));
        marker.addTo(this.map);
        this.bikeMarkers.push(marker);
      });
    }
    
    // create a Pedestrian marker with the size scaled to the amount of people in the area
    makePedestrianMarkers() {
      this.streetLatLon.forEach( (street:any) => {
        let radius = this.scaleCircleMarker(street["pedestrians"]);
        let marker = L.circleMarker([street["streetLatitude"], street["streetLongitude"]], {radius: radius}).setStyle({color: 'red'});
        marker.bindPopup(this.makePedestrianPopup(street));
        marker.addTo(this.map);
        this.pedestrianMarkers.push(marker);
      })
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
        let marker = L.marker([stop["stop_lat"], stop["stop_lon"]], {icon: greenIcon});
        //marker.bindPopup(this.makeBusPopup(stop));
        marker.addTo(this.map);
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

    // create selected popup Bike information for each marker
    makePedestrianPopup(street:any): string {
      return `` +
        `<div>Street: ${ street.streetName }</div>` +
        `<div>Area: ${ street.streetSubName }</div>` +
        `<div>Number of people: ${ street.pedestrians }</div>`
    }
    
    
    /*
    arrivalDelay: -1
departureDelay: 0
scheduleRelationship: "Scheduled"
stopId: "8220DB000896"
stopLat: "53.3133721496325"
stopLon: "-6.26135424684804"
stopName: "Palmerston Park, stop 896"
stopSequence: 1
    */
    makeBusPopup() {
      this.busData["Entity"].forEach(entity => {
        if(entity.TripUpdate.StopTimeUpdate) {
          entity.TripUpdate.StopTimeUpdate.forEach(stop => {
            let marker = this.busMarkers[stop.StopId]
            if (marker) {
              if(marker._popup) {
                let content = marker._popup.getContent()
                content = content + `<div> Route: ${ entity.TripUpdate.Trip.RouteId} Stop Sequence: ${stop.StopSequence}`
                marker._popup.setContent(content)
              }
              else
                marker.bindPopup(`<div style="text-align:center"> Stop Id: ${stop.StopId} </div>`)
            }
          })
        }
      })

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
    
    // show or remove map pins based on filter values
    setMapFilter() {
      if(this.showBikeMarkers) {
        this.bikeMarkers.forEach(marker => {
          this.map.addLayer(marker)
        })
        
      }
      if(!this.showBikeMarkers) {
        this.bikeMarkers.forEach(marker => {
          this.map.removeLayer(marker)
        })
      }
      
      if(this.showPedestrianMarkers) {
        this.pedestrianMarkers.forEach(marker => {
          this.map.addLayer(marker)
        })
        
      }
      if(!this.showPedestrianMarkers) {
        this.pedestrianMarkers.forEach(marker => {
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
    
    }

}

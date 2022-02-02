import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recommendation-dashboard',
  templateUrl: './recommendation-dashboard.component.html',
  styleUrls: ['./recommendation-dashboard.component.css']
})
export class RecommendationDashboardComponent implements OnInit {
  
  bikeData:any[] = [];
  openSpots:any[] = [];
  filledSpots:any[] = [];

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.getData();
  }
  
  getData() {
    // get snapshot of data from assets folder
    this.http.get('../assets/bikeData.json', {responseType: 'json'}).subscribe( (data) => {
      // store data in local list to display on HTML page
      this.bikeData = Object.values(data);
    
      this.getStationAvailability();
      this.openSpots = this.sortByMostOpen();
      this.filledSpots = this.sortByMostFilled();
    
    })
  }
  
  // calculate the percentage of open space for each bike station
  calculateOpenPercentage(filledSpots:number, openSpots:number):number {
    return ( openSpots / (filledSpots + openSpots) )
  }
  
  // calculate the percentage of filled space for each bike stand
  calculateFilledPercentage(filledSpots:number, openSpots:number):number {
    return ( filledSpots / (filledSpots + openSpots))
  }
  
  // update bike data with caluclated availability percentages
  getStationAvailability() {
    for(let i = 0; i < this.bikeData.length; i++) {
      this.bikeData[i]["openPercentage"] = this.calculateOpenPercentage(this.bikeData[i].available_bikes, this.bikeData[i].available_bike_stands);
      this.bikeData[i]["filledPercentage"] = this.calculateFilledPercentage(this.bikeData[i].available_bikes, this.bikeData[i].available_bike_stands);
    }
  }
  
  // sort the bike stations from most full to least full
  sortByMostFilled():any[] {
    let filledSpots = this.bikeData.sort((a, b) => b.filledPercentage - a.filledPercentage );
    return filledSpots.slice(0,5);
  }
  
  // sort the bike data from most open to least open
  sortByMostOpen():any[] {
    let openSpots = this.bikeData.sort((a, b) => b.openPercentage - a.openPercentage );
    return openSpots.slice(0,5);
  }
  
}

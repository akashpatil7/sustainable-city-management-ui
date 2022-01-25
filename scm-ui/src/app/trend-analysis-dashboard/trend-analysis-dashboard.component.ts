import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-trend-analysis-dashboard',
  templateUrl: './trend-analysis-dashboard.component.html',
  styleUrls: ['./trend-analysis-dashboard.component.css']
})
export class TrendAnalysisDashboardComponent implements OnInit {

  constructor(private http:HttpClient) { }
  
  // array to store each Dublin bike data entry
  bikeData:any;
  
  ngOnInit(): void {
    this.getData();
    
  }
  
  getData() {
    // get snapshot of data from assets folder
    this.http.get('../assets/bikeData.json', {responseType: 'json'}).subscribe( (data) => {
      // store data in local list to display on HTML page
      this.bikeData = data;
      this.getStationAvailability();
    })
  }
  
  // calculate the percentage of open space for each bike station
  calculateOpenPercentage(filledSpots:number, openSpots:number):number {
    return ( filledSpots / (filledSpots + openSpots) )
  }
  
  // calculate the percentage of filled space for each bike stand
  calculateFilledPercentage(filledSpots:number, openSpots:number):number {
    return ( openSpots / (filledSpots + openSpots))
  }
  
  // update bike data with caluclated availability percentages
  getStationAvailability() {
    for(let i = 0; i < this.bikeData.length; i++) {
      console.log(this.bikeData[i]);
      this.bikeData[i]["openPercentage"] = this.calculateOpenPercentage(this.bikeData[i].available_bikes, this.bikeData[i].available_bike_stands);
      this.bikeData[i]["filledPercentage"] = this.calculateFilledPercentage(this.bikeData[i].available_bikes, this.bikeData[i].available_bike_stands);
      console.log(this.bikeData[i]);
    }
    
  }
  

}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TrendsService } from '../trends.service';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-trend-analysis-dashboard',
  templateUrl: './trend-analysis-dashboard.component.html',
  styleUrls: ['./trend-analysis-dashboard.component.css']
})
export class TrendAnalysisDashboardComponent implements OnInit {

  constructor(private http:HttpClient, private trends:TrendsService) { }
  
  // array to store each Dublin bike data entry
  bikeTrends:any[] = [];
  hourlyBikeTrends:any[] = [];
  loadingData:boolean = true;
  currentTime:any;
  
  ngOnInit() {
    // get all default trends data    
    this.getHourlyBikeAverages();
  }

  // get hourly availability averages for bike stations
  getHourlyBikeAverages() {
    this.trends.getHourlyAverage().subscribe((res) => {
      this.hourlyBikeTrends = res;
      this.hourlyBikeTrends.sort(function(a, b){
          if(a._id < b._id) { return -1; }
          if(a._id > b._id) { return 1; }
          return 0;
      });
      
      this.currentTime = new Date();
      this.loadingData = false;
    })
    
  }
  
}

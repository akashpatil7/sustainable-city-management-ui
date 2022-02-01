import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TrendsService } from '../trends.service';

@Component({
  selector: 'app-trend-analysis-dashboard',
  templateUrl: './trend-analysis-dashboard.component.html',
  styleUrls: ['./trend-analysis-dashboard.component.css']
})
export class TrendAnalysisDashboardComponent implements OnInit {

  constructor(private http:HttpClient, private trends:TrendsService) { }
  
  // array to store each Dublin bike data entry
  bikeTrends:any[] = [];
  loadingData:boolean = true;
  currentTime:any;
  
  ngOnInit(): void {
    // get all default trends data
    this.trends.getTrends().subscribe((res) => {
      this.bikeTrends = Object.values(res);
      console.log(this.bikeTrends);
      this.currentTime = new Date();
      this.loadingData = false;
    });
    
    // get trends data with specified start and end dates
    /*
    this.trends.getTrendsFilterByDate().subscribe((res) => {
      console.log(res);
    });
    */

  }
  
  getTrendsByDate() {
    
  }
  
}

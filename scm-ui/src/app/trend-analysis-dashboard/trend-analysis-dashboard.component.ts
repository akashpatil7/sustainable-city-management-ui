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
  bikeData:any[] = [];
  
  ngOnInit(): void {
    this.getData();
    
    // call trends service to get trends from backend
    this.trends.getTrendsData().subscribe((res) => {
      console.log(res);
    });

  }
  
  // get snapshot of data from assets folder
  getData() {
    this.http.get('../assets/bikeData.json', {responseType: 'json'}).subscribe( (data) => {
      // store data in local list to display on HTML page
      this.bikeData = Object.values(data);
    })
  }
}

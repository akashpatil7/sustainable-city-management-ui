import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-real-time-dashboard',
  templateUrl: './real-time-dashboard.component.html',
  styleUrls: ['./real-time-dashboard.component.css']
})
export class RealTimeDashboardComponent implements OnInit {
  
  // array to store each Dublin bike data entry
  bikeData:any[] = [];

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.getData();
  }
  
  getData() {
    // get snapshot of data from assets folder
    this.http.get('../assets/bikeData.json', {responseType: 'json'}).subscribe( (data) => {
      // store data in local list to display on HTML page
      this.bikeData = Object.values(data);
    
    })
  }

}

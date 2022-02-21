import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecommendationsService } from '../services/recommendations.service';

@Component({
  selector: 'app-recommendation-dashboard',
  templateUrl: './recommendation-dashboard.component.html',
  styleUrls: ['./recommendation-dashboard.component.css']
})
export class RecommendationDashboardComponent implements OnInit {
  
  bikeData:any[] = [];
  openSpots:any[] = [];
  filledSpots:any[] = [];

  constructor(private http:HttpClient, private rs:RecommendationsService) { }

  ngOnInit(): void {
    this.getBikeRecommendations();
    
  }
  
  getBikeRecommendations() {
    this.rs.getBikeRecommendations().subscribe((res) => {
      console.log(res);
      this.openSpots = res.mostAvailableBikeStationData;
      this.filledSpots = res.mostEmptyBikeStationData;
    });
    
  }
  

  
}

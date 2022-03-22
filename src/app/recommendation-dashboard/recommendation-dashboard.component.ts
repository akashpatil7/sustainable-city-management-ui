import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecommendationsService } from '../services/recommendations.service';
import { TrendsService } from '../services/trends.service';

@Component({
  selector: 'app-recommendation-dashboard',
  templateUrl: './recommendation-dashboard.component.html',
  styleUrls: ['./recommendation-dashboard.component.css']
})
export class RecommendationDashboardComponent implements OnInit {

  bikeData:any[] = [];
  openSpots:any[] = [];
  filledSpots:any[] = [];
  highestAqi:any[] = [];
  lowestAqi:any[] = [];
  lowestCountPedestrianData:any[] = []
  highestCountPedestrianData:any[] = []
  mostDelayedBuses:any[] = []
  mostPollutedStops:any[] = []
  moveBikesFrom:any[] = []
  moveBikesTo:any[] = []
  
  // trends variables
  bikeTrends:any[] = [];
  hourlyBikeTrends:any[] = [];
  loadingData:boolean = true;
  currentTime:any;

  constructor(private http:HttpClient, private rs:RecommendationsService, private trends:TrendsService) { }

  ngOnInit(): void {
    this.getBikeRecommendations();
    this.getAqiRecommendations();
    this.getPedestrianRecommendations();
    this.getBusRecommendations();
    this.getBikePedestrianRecommendations();
    this.getHourlyBikeAverages();
  }

  getBikeRecommendations() {
    this.rs.getBikeRecommendations().subscribe((res) => {
      console.log(res);
      this.openSpots = res.mostAvailableBikeStationData;
      this.filledSpots = res.mostEmptyBikeStationData;
    });
  }
  
  getBikePedestrianRecommendations() {
    this.rs.getBikePedestrianRecommendations().subscribe((res) => {
      console.log(res);
      this.moveBikesFrom = res.moveBikesFrom;
      this.moveBikesTo = res.moveBikesTo;
    });
  }

  getAqiRecommendations() {
    this.rs.getAqiRecommendations().subscribe((res) => {
      console.log(res);
      this.highestAqi = res.highestAqiStationData;
      this.lowestAqi = res.lowestAqiStationData;
    });
  }

  getPedestrianRecommendations() {
      this.rs.getPedestrianRecommendations().subscribe((res) => {
        console.log(res);
        this.lowestCountPedestrianData = res.lowestCountPedestrianData;
        this.highestCountPedestrianData = res.highestCountPedestrianData;
      });
    }

  getBusRecommendations() {
    this.rs.getBusRecommendations().subscribe((res) => {
      console.log(res);
      this.mostDelayedBuses = res.mostDelayed;
      this.mostPollutedStops = res.mostPolluted;
    });
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

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecommendationsService } from '../services/recommendations.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recommendation-dashboard',
  templateUrl: './recommendation-dashboard.component.html',
  styleUrls: ['./recommendation-dashboard.component.css']
})
export class RecommendationDashboardComponent implements OnInit {

  bikeData: any[] = [];
  openSpots: any[] = [];
  filledSpots: any[] = [];
  highestAqi: any[] = [];
  lowestAqi: any[] = [];
  lowestCountPedestrianData: any[] = []
  highestCountPedestrianData: any[] = []
  mostDelayedBuses: any[] = []
  mostPollutedStops: any[] = []
  moveBikesFrom: any[] = []
  moveBikesTo: any[] = []
  displayedColumns = ['from', 'to']
  
  // trends variables
  bikeTrends: any[] = [];
  hourlyBikeTrends: any[] = [];
  loadingData: boolean = true;
  currentTime: any;

  subscription: Subscription = new Subscription;

  constructor(private http: HttpClient, private rs: RecommendationsService) { }

  ngOnInit(): void {
    console.log("init-ing")
    this.getBikeRecommendations();
    this.getAqiRecommendations();
    this.getPedestrianRecommendations();
    this.getBusRecommendations();
    this.getBikePedestrianRecommendations();
    this.getHourlyBikeAverages();
  }

  outdatedCache() {
    var outdated = true;
    let cacheTime = localStorage.getItem('cacheTime');
    if (cacheTime != null) {
      let then = parseInt(JSON.parse(cacheTime));
      let now = new Date().getTime();
      if (now-then < 60000) {
        outdated = false;
      }
    }
    return outdated;
  }
  
  getBikeRecommendations() {
    if (this.outdatedCache()) {
      console.log("getting bike recs from request")
      this.rs.getBikeRecommendations().subscribe((res) => {
        console.log(res);
        this.openSpots = res.mostAvailableBikeStationData;
        this.filledSpots = res.mostEmptyBikeStationData;
        localStorage.setItem("openSpots", JSON.stringify(this.openSpots));
        localStorage.setItem("filledSpots", JSON.stringify(this.filledSpots));
      });
    }
    else {
      console.log("getting bike recs from local storage")
      let openSpots = localStorage.getItem("openSpots")
      let filledSpots = localStorage.getItem("filledSpots")
      if (openSpots != null && filledSpots != null) {
        this.openSpots = JSON.parse(openSpots);
        this.filledSpots = JSON.parse(filledSpots);
      }
    }
  }

  getBikePedestrianRecommendations() {
    if (this.outdatedCache()) {
      this.rs.getBikePedestrianRecommendations().subscribe((res) => {
        console.log(res);
        this.moveBikesFrom = res.moveBikesFrom;
        this.moveBikesTo = res.moveBikesTo;
        localStorage.setItem("moveBikesFrom", JSON.stringify(this.moveBikesFrom));
        localStorage.setItem("moveBikesTo", JSON.stringify(this.moveBikesTo));
      });
    }
    else {
      let moveBikesFrom = localStorage.getItem("moveBikesFrom")
      let moveBikesTo = localStorage.getItem("moveBikesTo")
      if (moveBikesFrom != null && moveBikesTo != null) {
        this.moveBikesFrom = JSON.parse(moveBikesFrom);
        this.moveBikesTo = JSON.parse(moveBikesTo);
      }
    }
  }

  getAqiRecommendations() {
    if (this.outdatedCache()) {
      this.rs.getAqiRecommendations().subscribe((res) => {
        console.log(res);
        this.highestAqi = res.highestAqiStationData;
        this.lowestAqi = res.lowestAqiStationData;
        localStorage.setItem("highestAqi", JSON.stringify(this.highestAqi));
        localStorage.setItem("lowestAqi", JSON.stringify(this.lowestAqi));
      });
    }
    else {
      let highestAqi = localStorage.getItem("highestAqi")
      let lowestAqi = localStorage.getItem("lowestAqi")
      if (highestAqi != null && lowestAqi != null) {
        this.highestAqi = JSON.parse(highestAqi);
        this.lowestAqi = JSON.parse(lowestAqi);
      }
    }
  }

  getPedestrianRecommendations() {
    if (this.outdatedCache()) {
      this.rs.getPedestrianRecommendations().subscribe((res) => {
        console.log(res);
        this.lowestCountPedestrianData = res.lowestCountPedestrianData;
        this.highestCountPedestrianData = res.highestCountPedestrianData;
        localStorage.setItem("lowestCountPedestrianData", JSON.stringify(this.lowestCountPedestrianData));
        localStorage.setItem("highestCountPedestrianData", JSON.stringify(this.highestCountPedestrianData));
      });
    }
    else {
      let lowestCountPedestrianData = localStorage.getItem("lowestCountPedestrianData")
      let highestCountPedestrianData = localStorage.getItem("highestCountPedestrianData")
      if (lowestCountPedestrianData != null && highestCountPedestrianData != null) {
        this.lowestCountPedestrianData = JSON.parse(lowestCountPedestrianData);
        this.highestCountPedestrianData = JSON.parse(highestCountPedestrianData);
      }
    }
  }

  getBusRecommendations() {
    if (this.outdatedCache()) {
      this.rs.getBusRecommendations().subscribe((res) => {
        console.log(res);
        this.mostDelayedBuses = res.mostDelayed;
        this.mostPollutedStops = res.mostPolluted;
        localStorage.setItem("mostDelayedBuses", JSON.stringify(this.mostDelayedBuses));
        localStorage.setItem("mostPollutedStops", JSON.stringify(this.mostPollutedStops));
      });
    }
    else {
      let mostDelayedBuses = localStorage.getItem("mostDelayedBuses")
      let mostPollutedStops = localStorage.getItem("mostPollutedStops")
      if (mostDelayedBuses != null && mostPollutedStops != null) {
        this.mostDelayedBuses = JSON.parse(mostDelayedBuses);
        this.mostPollutedStops = JSON.parse(mostPollutedStops);
      }
    }
  }

  // get hourly availability averages for bike stations
  getHourlyBikeAverages() {
    if (this.outdatedCache()) {
      this.rs.getHourlyAverage().subscribe((res) => {
        this.hourlyBikeTrends = res;
        this.hourlyBikeTrends.sort(function (a, b) {
          if (a._id < b._id) { return -1; }
          if (a._id > b._id) { return 1; }
          return 0;
        });
        localStorage.setItem("hourlyBikeTrends", JSON.stringify(this.hourlyBikeTrends));
        this.loadingData = false;
      })
      var now = new Date().getTime();
      localStorage.setItem("cacheTime", JSON.stringify(now))
    }
    else {
      let hourlyBikeTrends = localStorage.getItem("hourlyBikeTrends")
      if (hourlyBikeTrends != null) {
        this.hourlyBikeTrends = JSON.parse(hourlyBikeTrends);
        this.loadingData = false;
      }
    }
    this.currentTime = new Date();
  }

}

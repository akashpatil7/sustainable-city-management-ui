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

  openBikeSpots: any[] = [];
  filledBikeSpots: any[] = [];
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
  hourlyBikeTrends: any[] = [];
  loadingData: boolean = true;
  currentTime: any;

  constructor(private http: HttpClient, private rs: RecommendationsService) { }

  /**
   * Automatically called when the component is loaded
   * Gets the data recommendations
   */
  ngOnInit(): void {
    console.log("init-ing")
    this.getBikeRecommendations();
    this.getAqiRecommendations();
    this.getPedestrianRecommendations();
    this.getBusRecommendations();
    this.getBikePedestrianRecommendations();
    this.getHourlyBikeAverages();
  }

  /**
   * Update cache time if outdated
   *
   * @returns {any} outdated
   */
  private outdatedCache() {
    var outdated = true;
    let cacheTime = localStorage.getItem('cacheTime');
    if (cacheTime != null) {
      let then = parseInt(JSON.parse(cacheTime));
      let now = new Date().getTime();
      if (now - then < 60000) {
        outdated = false;
      }
    }
    return outdated;
  }

  /*
   * Gets the bike recommendations
   */
  getBikeRecommendations() {
    if (this.outdatedCache()) {
      console.log("getting bike recs from request")
      this.rs.getBikeRecommendations().subscribe((res) => {
        console.log(res);
        this.openBikeSpots = res.mostAvailableBikeStationData;
        this.filledBikeSpots = res.mostEmptyBikeStationData;
        localStorage.setItem("openBikeSpots", JSON.stringify(this.openBikeSpots));
        localStorage.setItem("filledBikeSpots", JSON.stringify(this.filledBikeSpots));
      });
    }
    else {
      console.log("getting bike recs from local storage")
      let openSpots = localStorage.getItem("openBikeSpots")
      let filledSpots = localStorage.getItem("filledBikeSpots")
      if (openSpots != null && filledSpots != null) {
        this.openBikeSpots = JSON.parse(openSpots);
        this.filledBikeSpots = JSON.parse(filledSpots);
      }
    }
  }

  /*
   * Gets the bike-pedestrian recommendations
   */
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

  /*
   * Gets the AQI recommendations
   */
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

  /*
   * Gets the pedestrian recommendations
   */
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

  /*
   * Gets the bus recommendations
   */
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

  /*
   * Gets hourly availability averages for bike stations
   */
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

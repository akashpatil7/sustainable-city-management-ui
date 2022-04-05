import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RecommendationDashboardComponent } from './recommendation-dashboard.component';
import { Observable, Observer } from 'rxjs';
import { of } from "rxjs";
import { RouterTestingModule } from '@angular/router/testing';
import { RecommendationsService } from '../services/recommendations.service';

describe('RecommendationDashboardComponent', () => {
  let component: RecommendationDashboardComponent;
  let fixture: ComponentFixture<RecommendationDashboardComponent>;
  let service: RecommendationsService;
  let spy: any;

  beforeEach(async () => {
    localStorage.setItem("token", "12345");
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
      ],
      declarations: [ RecommendationDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {    
    fixture = TestBed.createComponent(RecommendationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    localStorage.removeItem("cacheTime");
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get bike recommendations', () => {
    service=TestBed.inject(RecommendationsService);
    spy = spyOn(service, 'getBikeRecommendations').and.callFake(()=> getBikeRecommendations());
    let recs = component.getBikeRecommendations();
    expect(component.openSpots).toEqual([1]);
    expect(component.filledSpots).toEqual([2]);
  });
  
  it('should receive hourly bike trends and sort them',() => {
    service= TestBed.inject(RecommendationsService);
    spy = spyOn(service, 'getHourlyAverage').and.callFake(() => getHourlyAverage());
    let recs = component.getHourlyBikeAverages();
    expect(component.hourlyBikeTrends.length).toEqual(2);
    expect(component.hourlyBikeTrends[0]._id).toEqual("1");
  });

  it('should get AQI recommendation', () => {
    service = TestBed.inject(RecommendationsService);
    spy = spyOn(service, 'getAqiRecommendations').and.callFake(() => getAqiRecommendations());
    let recs = component.getAqiRecommendations();
    expect(component.highestAqi).toEqual([1]);
    expect(component.lowestAqi).toEqual([2]);
  });

  it('should get pedestrian recommendation', () => {
      service = TestBed.inject(RecommendationsService);
      spy = spyOn(service, 'getPedestrianRecommendations').and.callFake(() => getPedestrianRecommendations());
      let recs = component.getPedestrianRecommendations();
      expect(component.lowestCountPedestrianData).toEqual([1]);
      expect(component.highestCountPedestrianData).toEqual([2]);
    });

  it('should get bus recommendation', () => {
      service = TestBed.inject(RecommendationsService);
      spy = spyOn(service, 'getBusRecommendations').and.callFake(() => getBusRecommendations());
      let recs = component.getBusRecommendations();
      expect(component.mostDelayedBuses).toEqual([1]);
      expect(component.mostPollutedStops).toEqual([2]);
    });
    
  it('should get bike and pedestrian recommendation', () => {
      service = TestBed.inject(RecommendationsService);
      spy = spyOn(service, 'getBikePedestrianRecommendations').and.callFake(() => getBikePedestrianRecommendations());
      let recs = component.getBikePedestrianRecommendations();
      expect(component.moveBikesFrom[0].availableBikes).toEqual(33);
      expect(component.moveBikesFrom[0].name).toEqual("TALBOT STREET");
      expect(component.moveBikesTo[0].count).toEqual(5150);
      expect(component.moveBikesTo[0].street).toEqual("Newcomen Bridge/Charleville mall inbound");
    });

});

function getBikeRecommendations():Observable<any> {
  let res = {"mostAvailableBikeStationData": [1], "mostEmptyBikeStationData": [2]};
  return of(res);
}

function getAqiRecommendations():Observable<any> {
  let res = {"highestAqiStationData" : [1] ,"lowestAqiStationData" : [2]};
  return of(res);
}

function getPedestrianRecommendations():Observable<any> {
  let res = {"lowestCountPedestrianData" : [1], "highestCountPedestrianData" : [2]};
  return of(res);
}

function getBusRecommendations():Observable<any> {
  let res = {"mostDelayed" : [1] ,"mostPolluted" : [2]};
  return of(res);
}

function getHourlyAverage(): Observable<any> {
  let trendOne = { _id: "1", "current": { "avgAvailability": 1 }, "entry": { "hour": 1, "avgAvailability": 1 } };
  let trendTwo = { _id: "2", "current": { "avgAvailability": 1 }, "entry": { "hour": 1, "avgAvailability": 1 } };
  let res = [trendOne, trendTwo];
  return of(res);
}

function getBikePedestrianRecommendations():Observable<any> {
  let station1 = {availableBikes: 33, name: "TALBOT STREET" };
  let station2 = {availableBikes: 30, name: "FREDERICK STREET SOUTH" };
  let pedestrian1 = {count: 5150, street: "Newcomen Bridge/Charleville mall inbound"};
  let pedestrian2 = {count: 4698, street: "North Wall Quay/Samuel Beckett bridge East"};
  let res = {"moveBikesFrom": [station1, station2], "moveBikesTo": [pedestrian1, pedestrian2]};
  return of(res);
}

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RecommendationDashboardComponent } from './recommendation-dashboard.component';
import { Observable, Observer } from 'rxjs';
import { of } from "rxjs";
import { RouterTestingModule } from '@angular/router/testing';
import { RecommendationsService } from '../services/recommendations.service';
import { TrendsService } from '../services/trends.service';

describe('RecommendationDashboardComponent', () => {
  let component: RecommendationDashboardComponent;
  let fixture: ComponentFixture<RecommendationDashboardComponent>;
  let service: RecommendationsService;
  let trendsService: TrendsService;
  let spy: any;
  let trendsSpy: any;

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
  
  it('should receive bike trends and sort them',() => {
    trendsService = TestBed.inject(TrendsService);
    trendsSpy = spyOn(trendsService, 'getHourlyAverage').and.callFake(() => getHourlyAverage());
    let recs = component.getHourlyBikeAverages();
    expect(component.hourlyBikeTrends.length).toEqual(2);
    expect(component.hourlyBikeTrends[0]._id).toEqual("1");
  });

});

function getBikeRecommendations():Observable<any> {
  let res = {"mostAvailableBikeStationData": [1], "mostEmptyBikeStationData": [2]};
  return of(res);
}

function getHourlyAverage(): Observable<any> {
  let trendOne = { _id: "1", "current": { "avgAvailability": 1 }, "entry": { "hour": 1, "avgAvailability": 1 } };
  let trendTwo = { _id: "2", "current": { "avgAvailability": 1 }, "entry": { "hour": 1, "avgAvailability": 1 } };
  let res = [trendOne, trendTwo];
  return of(res);
}

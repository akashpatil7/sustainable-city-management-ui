import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { TrendAnalysisDashboardComponent } from './trend-analysis-dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';
import { RealTimeDashboardComponent } from '../real-time-dashboard/real-time-dashboard.component';
import { TrendsService } from '../services/trends.service';
import { Observable, Observer, of } from 'rxjs';

describe('TrendAnalysisDashboardComponent', () => {
  let component: TrendAnalysisDashboardComponent;
  let fixture: ComponentFixture<TrendAnalysisDashboardComponent>;
  let service: TrendsService;
  let spy: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes([
          { path: 'real-time-dashboard', component: RealTimeDashboardComponent }
        ])
      ],
      declarations: [TrendAnalysisDashboardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    localStorage.setItem("token", "test");

    service = TestBed.inject(TrendsService);
    spy = spyOn(service, 'getHourlyAverage').and.callFake(() => getHourlyAverage());

    fixture = TestBed.createComponent(TrendAnalysisDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive bike trends and sort them', waitForAsync(() => {
    component.getHourlyBikeAverages();
    expect(component.hourlyBikeTrends.length).toEqual(2);
    expect(component.hourlyBikeTrends[0]._id).toEqual("1");
  }));



});

function getHourlyAverage(): Observable<any> {
  let trendOne = { _id: "1", "current": { "avgAvailability": 1 }, "entry": { "hour": 1, "avgAvailability": 1 } };
  let trendTwo = { _id: "2", "current": { "avgAvailability": 1 }, "entry": { "hour": 1, "avgAvailability": 1 } };
  let res = [trendOne, trendTwo];
  return of(res);
}


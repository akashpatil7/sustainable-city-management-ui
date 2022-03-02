import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { TrendAnalysisDashboardComponent } from './trend-analysis-dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';
import { RealTimeDashboardComponent } from '../real-time-dashboard/real-time-dashboard.component';
import { TrendsService } from '../services/trends.service';
import { Observable, Observer } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

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
          { path: 'real-time-dashboard', component: RealTimeDashboardComponent}
      ])
      ],
      declarations: [ TrendAnalysisDashboardComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    localStorage.setItem("token", "test");

    service = TestBed.inject(TrendsService);
    spy = spyOn(service, 'getHourlyAverage').and.callFake(()=> getHourlyAverage());

    fixture = TestBed.createComponent(TrendAnalysisDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should render bike trend table', waitForAsync(()  => {
    component.getHourlyBikeAverages();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const rows = fixture.nativeElement.querySelectorAll('mat-expansion-panel');
      if (rows) {
        //expect(rows.length).toBe(110);
        // TODO(all): Add tests.
      }
    })
  }));
  

  
});
function getHourlyAverage(): Observable<any> {
  return new Observable((observer: Observer<any>) => {});
}


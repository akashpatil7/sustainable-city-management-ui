import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { RecommendationDashboardComponent } from './recommendation-dashboard.component';
import { Observable, Observer } from 'rxjs';
import { RealTimeDataService } from '../services/real-time-data-service.service';
import { RouterTestingModule } from '@angular/router/testing';
import { RecommendationsService } from '../services/recommendations.service';

describe('RecommendationDashboardComponent', () => {
  let component: RecommendationDashboardComponent;
  let fixture: ComponentFixture<RecommendationDashboardComponent>;
  let service: RecommendationsService;
  let rtService: RealTimeDataService;
  let spy: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
      ],
      declarations: [ RecommendationDashboardComponent ]
    })
    .compileComponents();

    rtService = TestBed.inject(RealTimeDataService);
    spy = spyOn(rtService, 'getRealTimeData').and.callFake(()=> getRealTimeData());
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

function getRealTimeData():Observable<any> {
  return new Observable((observer: Observer<any>) => {
  });
}

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

});

function getBikeRecommendations():Observable<any> {
  let res = {"mostAvailableBikeStationData": [1], "mostEmptyBikeStationData": [2]};
  return of(res);
}

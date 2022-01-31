import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationDashboardComponent } from './recommendation-dashboard.component';

import { HttpClientModule } from '@angular/common/http'

describe('RecommendationDashboardComponent', () => {
  let component: RecommendationDashboardComponent;
  let fixture: ComponentFixture<RecommendationDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule
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
});

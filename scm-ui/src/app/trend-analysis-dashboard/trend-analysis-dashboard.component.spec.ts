import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendAnalysisDashboardComponent } from './trend-analysis-dashboard.component';

import { HttpClientModule } from '@angular/common/http'

describe('TrendAnalysisDashboardComponent', () => {
  let component: TrendAnalysisDashboardComponent;
  let fixture: ComponentFixture<TrendAnalysisDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      declarations: [ TrendAnalysisDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendAnalysisDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

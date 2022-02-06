import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { TrendAnalysisDashboardComponent } from './trend-analysis-dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';
import { RealTimeDashboardComponent } from '../real-time-dashboard/real-time-dashboard.component';

describe('TrendAnalysisDashboardComponent', () => {
  let component: TrendAnalysisDashboardComponent;
  let fixture: ComponentFixture<TrendAnalysisDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes([
          { path: 'real-time-dashboard', component: RealTimeDashboardComponent}
      ])
      ],
      declarations: [ TrendAnalysisDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    localStorage.setItem("token", "test");
    fixture = TestBed.createComponent(TrendAnalysisDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should render bike trend table', waitForAsync(()  => {
    const fixture = TestBed.createComponent(TrendAnalysisDashboardComponent);
    component.getHourlyBikeAverages();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const rows = fixture.nativeElement.querySelectorAll('mat-expansion-panel');
      if (rows) {
        console.log('hihihihi')
        expect(rows.length).toBe(110);
      }
    })
  }));
  

  
});

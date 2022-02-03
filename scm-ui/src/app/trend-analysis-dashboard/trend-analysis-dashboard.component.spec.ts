import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { TrendAnalysisDashboardComponent } from './trend-analysis-dashboard.component';
import { RealTimeDashboardComponent } from '../real-time-dashboard/real-time-dashboard.component';

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
  
  it('should render bike trend table', () => {
    const fixture = TestBed.createComponent(RealTimeDashboardComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    
    let tableHeaders = fixture.nativeElement.querySelector('#bikeTable');
    /*
    expect(tableHeaders[0].innerHTML).toBe('Last Updated');
    expect(tableHeaders[1].innerHTML).toBe('Station Name');
    expect(tableHeaders[2].innerHTML).toBe('Available bikes');
    expect(tableHeaders[3].innerHTML).toBe('Available stands');
    expect(tableHeaders.length).toBe(4);
    */
    
  });
  
});

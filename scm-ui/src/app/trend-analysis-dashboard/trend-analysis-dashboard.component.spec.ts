import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { TrendAnalysisDashboardComponent } from './trend-analysis-dashboard.component';


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
    const fixture = TestBed.createComponent(TrendAnalysisDashboardComponent);
    fixture.detectChanges();
    const rows = fixture.nativeElement.querySelector('mat-expansion-panel');
    expect(rows.length).toBe(110);
  });
  

  
});

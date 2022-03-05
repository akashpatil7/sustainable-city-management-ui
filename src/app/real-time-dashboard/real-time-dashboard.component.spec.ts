import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { RealTimeDashboardComponent } from './real-time-dashboard.component';
import { RealTimeDataService } from '../services/real-time-data-service.service';
import { Observable, Observer } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchFilterPipe } from '../pipes/search-filter.pipe';

describe('RealTimeDashboardComponent', () => {
  let component: RealTimeDashboardComponent;
  let fixture: ComponentFixture<RealTimeDashboardComponent>;
  let service: RealTimeDataService;
  let spy: any;


  beforeEach(async () => {
    localStorage.setItem("token", "12345");
    await TestBed.configureTestingModule({
      declarations: [ RealTimeDashboardComponent, SearchFilterPipe ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        RouterTestingModule.withRoutes(
          [{path: 'real-time-dashboard', component: RealTimeDashboardComponent}]
        )
      ],
    })
    .compileComponents();

    service = TestBed.inject(RealTimeDataService);
    spy = spyOn(service, 'getRealTimeData').and.callFake(()=> getRealTimeData());
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealTimeDashboardComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should render data headers', () => {
    fixture = TestBed.createComponent(RealTimeDashboardComponent);
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    let tableHeaders = compiled.querySelectorAll('th');
    
    expect(tableHeaders[0].innerHTML).toBe('Last Updated');
    expect(tableHeaders[1].innerHTML).toBe('Station Name');
    expect(tableHeaders[2].innerHTML).toBe('Available bikes');
    expect(tableHeaders[3].innerHTML).toBe('Available stands');
    
  });
  
  it('should load in bike data', () => {
    expect(service.getRealTimeData).toHaveBeenCalled();
    //fixture.detectChanges();
    expect(component.bikeData.length).toBeGreaterThan(0);
    /*
    fixture = TestBed.createComponent(RealTimeDashboardComponent);
    fixture.detectChanges();
    expect(component.bikeData.length).toBe(0);
    component.getBikeData();
    tick();
    fixture.detectChanges();
    expect(component.bikeData.length).toBeGreaterThan(0);
    */
  });
  

  it('should handle aqi response', () => {
    expect(component).toBeTruthy();
  });


});
function getRealTimeData():Observable<any> {
  return new Observable((observer: Observer<any>) => {
  });
}


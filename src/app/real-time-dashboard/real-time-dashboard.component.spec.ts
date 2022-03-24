import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { RealTimeDashboardComponent } from './real-time-dashboard.component';
import { RealTimeDataService } from '../services/real-time-data-service.service';
import { Observable, Observer, of } from 'rxjs';
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
        FormsModule,
        RouterTestingModule,
        RouterTestingModule.withRoutes(
          [{path: 'real-time-dashboard', component: RealTimeDashboardComponent}]
        )
      ],
    })
    .compileComponents();

    service = TestBed.inject(RealTimeDataService);
    spy = spyOn(service, 'getRealTimeData').withArgs("bike").and.callFake(() => getRealTimeData("bike")).withArgs("bus").and.callFake(() => getRealTimeData("bus")).withArgs("aqi").and.callFake(() => getRealTimeData("aqi")).withArgs("ped").and.callFake(() => getRealTimeData("ped"));
    fixture = TestBed.createComponent(RealTimeDashboardComponent);
    fixture.detectChanges()
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should load in bike data', () => {
    expect(component.bikeData.length).toBeGreaterThan(0);
  });
  
  it('should render data headers', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    let tableHeaders = compiled.querySelectorAll('th');
    
    expect(tableHeaders[0].innerHTML).toBe('Last Updated');
    expect(tableHeaders[1].innerHTML).toBe('Station Name');
    expect(tableHeaders[2].innerHTML).toBe('Available bikes');
    expect(tableHeaders[3].innerHTML).toBe('Available stands');
    
  });

  it('should handle aqi response', () => {
    expect(component).toBeTruthy();
  });


});

function getRealTimeData(dataType:string):Observable<any> {
  let data = {}
  if (dataType=="bike") {
    let bike = {"id": 0}
    data = [bike];
  }
  if (dataType=="aqi") {
    let aqiTime = {"stime": "Jun 15, 2015, 9:03:01 AM"}
    let aqiStation = {"name": "test"}
    let aqi = {"uid": 0, "time": aqiTime, "station": aqiStation}
    data = [aqi];
  }
  if (dataType=="ped") {
    let ped = {"id": 0}
    data = [ped];
  }
  if (dataType=="bus") {
    let bus = {"routeId": 0}
    data = [bus];
  }
  return of(data);
}


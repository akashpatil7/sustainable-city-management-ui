import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { RealTimeDashboardComponent } from './real-time-dashboard.component';
import { RealTimeDataService } from '../services/real-time-data-service.service';
import { Observable, of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchFilterPipe } from '../pipes/search-filter.pipe';
import { DublinBikesData } from '../models/DublinBikesData';

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
    localStorage.removeItem("dataCacheTime");
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
  
  it('should load in bus data', () => {
    expect(component.busData.length).toBeGreaterThan(0);
  });
  
  it('should load in aqi data', () => {
    expect(component.aqiData.length).toBeGreaterThan(0);
  });
  
  it('should load in pedestrian data', () => {
    expect(component.pedestrianData.length).toBeGreaterThan(0);
  });
  
  it('should render data headers', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    let tableHeaders = compiled.querySelectorAll('th');
    
    expect(tableHeaders[0].innerHTML).toBe('Last Updated');
    expect(tableHeaders[1].innerHTML).toBe('Station Name');
    expect(tableHeaders[2].innerHTML).toBe('Available bikes');
    expect(tableHeaders[3].innerHTML).toBe('Available stands');
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle bike response', () => {
    let bike1 = new DublinBikesData();
    bike1.name = "a";
    bike1.last_update = "0";
    bike1.available_bikes = 1;
    bike1.latitude = 1;
    bike1.longitude = 1;

    let bike2 = new DublinBikesData();
    bike2.name = "b";
    bike2.last_update = "0";
    bike2.available_bikes = 2;
    bike2.latitude = 1;
    bike2.longitude = 1;

    let data: DublinBikesData[] = [bike2, bike1];
    component.handleBikeResponse(data);
    expect(component.bikeData[0].name).toBe("a");
    expect(component.mostBikesChartData[0].data).toEqual([2,1]);
    expect(component.leastBikesChartData[0].data).toEqual([1,2]);
  });
  
  it('should scale a pedestrian marker based on population count', () => {
    let pedestrianCount = 1746;
    let scaledCount = component.scaleCircleMarker(pedestrianCount);
    expect(scaledCount).toBe(19.549999999999997)
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


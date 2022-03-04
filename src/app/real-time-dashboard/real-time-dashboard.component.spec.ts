import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { RealTimeDashboardComponent } from './real-time-dashboard.component';
import { RealTimeDataService } from '../services/real-time-data-service.service';
import { Observable, Observer } from 'rxjs';
import { SearchFilterPipe } from '../pipes/search-filter.pipe';
import { of } from 'rxjs';
//import { DublinBikesData } from '../models/DublinBikesData';

describe('RealTimeDashboardComponent', () => {
  let component: RealTimeDashboardComponent;
  let fixture: ComponentFixture<RealTimeDashboardComponent>;
  let service: RealTimeDataService;
  let spy: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealTimeDashboardComponent, SearchFilterPipe],
      imports: [
        HttpClientModule,
        //DublinBikesData
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    localStorage.setItem("token", "12345");

    service = TestBed.inject(RealTimeDataService);
    //spy = spyOn(service, 'getRealTimeData').and.callFake(()=> getRealTimeData());
    spy = spyOn(service, 'getRealTimeData').and.callFake(() => {return Observable.create( observer => {
    observer.next(["hello", "world"]);
    observer.complete();
});})

    fixture = TestBed.createComponent(RealTimeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should render data headers', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    let tableHeaders = fixture.nativeElement.querySelectorAll('th');
    
    expect(tableHeaders[0].innerHTML).toBe('Last Updated');
    expect(tableHeaders[1].innerHTML).toBe('Station Name');
    expect(tableHeaders[2].innerHTML).toBe('Available bikes');
    expect(tableHeaders[3].innerHTML).toBe('Available stands');
    expect(tableHeaders.length).toBe(4);
    
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
  


});
function getRealTimeData():Observable<any> {
  return new Observable((observer: Observer<any>) => {
  });
}


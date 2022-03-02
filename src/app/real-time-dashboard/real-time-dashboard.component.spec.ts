import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { RealTimeDashboardComponent } from './real-time-dashboard.component';
import { RealTimeDataService } from '../services/real-time-data-service.service';
import { filter, Observable, Observer } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SearchFilterPipe } from '../pipes/search-filter.pipe';


describe('RealTimeDashboardComponent', () => {
  let component: RealTimeDashboardComponent;
  let fixture: ComponentFixture<RealTimeDashboardComponent>;
  let service: RealTimeDataService;
  let spy: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealTimeDashboardComponent, SearchFilterPipe ],
      imports: [
        HttpClientModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    localStorage.setItem("token", "12345");

    service = TestBed.inject(RealTimeDataService);
    spy = spyOn(service, 'getRealTimeData').and.callFake(()=> getRealTimeData());

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


});
function getRealTimeData():Observable<any> {
  return new Observable((observer: Observer<any>) => {
  });
}


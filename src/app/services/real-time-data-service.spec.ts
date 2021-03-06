import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { RealTimeDataService } from './real-time-data-service.service';

describe('RealTimeDataService', () => {
  let service: RealTimeDataService;

  beforeEach(() => {
    localStorage.setItem("token", "12345");
    TestBed.configureTestingModule({imports:[
      HttpClientModule
    ]});
    service = TestBed.inject(RealTimeDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

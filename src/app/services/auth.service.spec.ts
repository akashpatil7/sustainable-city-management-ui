import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, Observer } from 'rxjs';
import { UserServiceComponentComponent } from '../user-service-component/user-service-component.component';

import { AuthService } from './auth.service';
import { RealTimeDataService } from './real-time-data-service.service';

describe('AuthService', () => {
  let service: AuthService;
  let rtService: RealTimeDataService;
  let spy: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes(
          [{path: 'login', component: UserServiceComponentComponent}]
        )
      ]
    });
    service = TestBed.inject(AuthService);
    rtService = TestBed.inject(RealTimeDataService);
    spy = spyOn(rtService, 'getRealTimeData').and.callFake(()=> getRealTimeData());
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check if user is logged in', () => {
    localStorage.removeItem("token");
    expect(service.isLoggedIn()).toBeFalse;
    
    localStorage.setItem('Token', "12345");
    expect(service.isLoggedIn()).toBeTrue;
  });

  it('should check if user is logged out', () => {
    localStorage.setItem("token", "test123");
    service.logout();    
    expect(localStorage.getItem('token')).toBeFalse;
  });
});

function getRealTimeData():Observable<any> {
  return new Observable((observer: Observer<any>) => {
  });
}

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserServiceComponentComponent } from '../user-service-component/user-service-component.component';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(
          [{path: 'login', component: UserServiceComponentComponent}]
        )
      ]
    });
    service = TestBed.inject(AuthService);
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

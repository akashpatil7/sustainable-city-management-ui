import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
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

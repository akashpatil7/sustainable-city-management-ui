import { TestBed } from '@angular/core/testing';

import { LoginRegisterServiceService } from './login-register-service.service';

import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('LoginRegisterServiceService', () => {
  let service: LoginRegisterServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
    })
    .compileComponents();
    service = TestBed.inject(LoginRegisterServiceService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

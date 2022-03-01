import { TestBed } from '@angular/core/testing';

import { LoginRegisterServiceService } from './login-register-service.service';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginRegisterServiceService', () => {
  let service: LoginRegisterServiceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
    })
    .compileComponents();
    service = TestBed.inject(LoginRegisterServiceService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { LoginRegisterServiceService } from './login-register-service.service';

describe('LoginRegisterServiceService', () => {
  let service: LoginRegisterServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginRegisterServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

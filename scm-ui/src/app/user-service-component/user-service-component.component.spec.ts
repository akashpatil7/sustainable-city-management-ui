import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserServiceComponentComponent } from './user-service-component.component';

import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

describe('UserServiceComponentComponent', () => {
  let component: UserServiceComponentComponent;
  let fixture: ComponentFixture<UserServiceComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientModule
      ],
      declarations: [ UserServiceComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserServiceComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render login wrap', () => {
    const fixture = TestBed.createComponent(UserServiceComponentComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#login-form-wrap h2')?.textContent).toContain('Login');
  });

  it('should display register wrap', () => {
    const fixture = TestBed.createComponent(UserServiceComponentComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    let button = fixture.debugElement.nativeElement.querySelector('#create-account');
    button.click();
    var registerForm = compiled.querySelector('#register-form-wrap');
    if(registerForm) {
      var style = getComputedStyle(registerForm);
      expect(style["display"]).toContain('block');
    }

    var loginForm = compiled.querySelector('#login-form-wrap');
    if(loginForm) {
      var style = getComputedStyle(loginForm);
      expect(style["display"]).toContain('none');
    }
  });

  it('should check that the registered passwords are the same', () => {
    const fixture = TestBed.createComponent(UserServiceComponentComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    
    var testPassword1 = "test_password";
    var testPassword2 = "test_password";

    var arePasswordsTrue = component.checkPasswords(testPassword1, testPassword2);
    expect(arePasswordsTrue).toBeTrue();

    
    testPassword1 = "test_password";
    testPassword2 = "test_password_not_same";

    arePasswordsTrue = component.checkPasswords(testPassword1, testPassword2);
    expect(arePasswordsTrue).toBeFalse();
  });

  it('should display login wrap', () => {
    const fixture = TestBed.createComponent(UserServiceComponentComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    let button = fixture.debugElement.nativeElement.querySelector('#login-account');
    button.click();

    var loginForm = compiled.querySelector('#login-form-wrap');
    if(loginForm) {
      var style = getComputedStyle(loginForm);
      expect(style["display"]).toContain('block');
    }

    var registerForm = compiled.querySelector('#register-form-wrap');
    if(registerForm) {
      var style = getComputedStyle(registerForm);
      expect(style["display"]).toContain('none');
    }
  });

  it('should make sure email is valid when registering', () => {
    var invalidEmail = { "email": "test@invalid.ie", "username": "test", "password1": "test", "password2": "test"};
    var validEmail = { "email": "test@dublincity.ie", "username": "test", "password1": "test", "password2": "test"};

    var isValidEmail = component.isValidEmail(invalidEmail.email);
    expect(isValidEmail).toBeFalse();

    isValidEmail = component.isValidEmail(validEmail.email);
    expect(isValidEmail).toBeTrue();
  });
});

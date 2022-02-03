import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { UserServiceComponentComponent } from './user-service-component.component';

import { FormsModule } from '@angular/forms';

import { RouterTestingModule } from '@angular/router/testing';

describe('UserServiceComponentComponent', () => {
  let component: UserServiceComponentComponent;
  let fixture: ComponentFixture<UserServiceComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientModule,
        RouterTestingModule
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

  it('should save token to localStorage on login and redirect', () => {
    var data = { "token": "12345" };
    component.handleLoginResponse(data);
    expect(localStorage.getItem("token")).toEqual("12345");
  });

  it('should show login error with error string', () => {
    let error: string = "Invalid Email";
    var data = { "email": "test@invalid.ie",  "password": "test"};
    component.onLogin(data);
    
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    var popup = compiled.querySelector('#response1');
    if (popup) {
      var style = getComputedStyle(popup);
      expect(style["display"]).toContain('block');
      expect(popup.textContent).toContain(error);
    }
  });

  it('should show register error with error string', () => {
    let error: string = "Invalid email or password.";
    var data = { "email": "test@invalid.ie",  "username": "test", "password1": "test",  "password2": "test"};
    component.onRegister(data);
    
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    var popup = compiled.querySelector('#response2');
    if (popup) {
      var style = getComputedStyle(popup);
      expect(style["display"]).toContain('block');
      expect(popup.textContent).toContain(error);
    }
  });

  it('should clear popups', () => {
    var data = { "email": "test@invalid.ie",  "username": "test", "password1": "test",  "password2": "test"};
    component.onRegister(data);
    
    const compiled = fixture.nativeElement as HTMLElement;
    var popup1 = compiled.querySelector('#response1');
    if (popup1) {
      component.clearPopups()
      fixture.detectChanges();
      var style = getComputedStyle(popup1);
      expect(style["display"]).toContain('none');
    }
  });
});

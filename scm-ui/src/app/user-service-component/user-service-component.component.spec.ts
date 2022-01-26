import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserServiceComponentComponent } from './user-service-component.component';

import { FormsModule } from '@angular/forms';

describe('UserServiceComponentComponent', () => {
  let component: UserServiceComponentComponent;
  let fixture: ComponentFixture<UserServiceComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule
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
});

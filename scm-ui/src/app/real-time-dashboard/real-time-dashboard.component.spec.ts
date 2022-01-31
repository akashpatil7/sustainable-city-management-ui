import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealTimeDashboardComponent } from './real-time-dashboard.component';

import { HttpClientModule } from '@angular/common/http';

describe('RealTimeDashboardComponent', () => {
  let component: RealTimeDashboardComponent;
  let fixture: ComponentFixture<RealTimeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      declarations: [ RealTimeDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealTimeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  /*
  it('should render data table', () => {
    const fixture = TestBed.createComponent(RealTimeDashboardComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('th')?.textContent).toContain('Last Updated');
  });
  */

});

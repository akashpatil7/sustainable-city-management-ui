import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { RealTimeDashboardComponent } from './real-time-dashboard.component';

describe('RealTimeDashboardComponent', () => {
  let component: RealTimeDashboardComponent;
  let fixture: ComponentFixture<RealTimeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealTimeDashboardComponent ],
      imports: [
        HttpClientModule
      ]
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
  
  it('should render data headers', () => {
    const fixture = TestBed.createComponent(RealTimeDashboardComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    
    let tableHeaders = fixture.nativeElement.querySelectorAll('th');
    
    expect(tableHeaders[0].innerHTML).toBe('Last Updated');
    expect(tableHeaders[1].innerHTML).toBe('Station Name');
    expect(tableHeaders[2].innerHTML).toBe('Available bikes');
    expect(tableHeaders[3].innerHTML).toBe('Available stands');
    expect(tableHeaders.length).toBe(4);
    
  });


});

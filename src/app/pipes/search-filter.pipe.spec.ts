import { TestBed } from '@angular/core/testing';
import { Observable, Observer } from 'rxjs';
import { RealTimeDataService } from '../services/real-time-data-service.service';
import { AqiSearchFilterPipe } from './aqi-search-filter.pipe';
import { SearchFilterPipe } from './search-filter.pipe';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('SearchFilterPipe', () => {
  let pipe: SearchFilterPipe;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AqiSearchFilterPipe, SearchFilterPipe ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
      ],
    })
    .compileComponents();
  });

  it('create an instance', () => {
    pipe = new SearchFilterPipe();
    expect(pipe).toBeTruthy();
  });
});

describe('AqiSearchFilterPipe', () => {
  let pipe: AqiSearchFilterPipe;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AqiSearchFilterPipe, SearchFilterPipe ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
      ],
    })
    .compileComponents();
  });

  it('create an instance', () => {
    pipe = new AqiSearchFilterPipe();
    expect(pipe).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
import { Observable, Observer } from 'rxjs';
import { RealTimeDataService } from '../services/real-time-data-service.service';
import { AqiSearchFilterPipe } from './aqi-search-filter.pipe';
import { SearchFilterPipe } from './search-filter.pipe';
import { DublinBikesData } from '../models/DublinBikesData';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('SearchFilterPipe', () => {
  let pipe:SearchFilterPipe;
  
  beforeEach(() => {
    pipe = new SearchFilterPipe();
  })

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
  
  it('providing no search value returns empty array', () => {
    expect(pipe.transform([], "")).toHaveSize(0)
  });
  
  it('search text returns one value', () => {
      let station1:DublinBikesData = {
        id: 1,
        harvest_time: "1",
        station_id: "1",
        available_bike_stands: 1,
        bike_stands: 1,
        available_bikes: 1,
        last_update: "1",
        status: "1",
        name: "hello",
        latitude: 1,
        longitude: 1
      }
      let station2:DublinBikesData = {
        id: 1,
        harvest_time: "1",
        station_id: "1",
        available_bike_stands: 1,
        bike_stands: 1,
        available_bikes: 1,
        last_update: "1",
        status: "1",
        name: "world",
        latitude: 1,
        longitude: 1
      }

    expect(pipe.transform([station1, station2], "he")).toHaveSize(1)
  });
});

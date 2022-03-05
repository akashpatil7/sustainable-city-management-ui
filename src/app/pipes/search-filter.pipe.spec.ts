import { TestBed } from '@angular/core/testing';
import { SearchFilterPipe } from './search-filter.pipe';
import { DublinBikesData } from '../models/DublinBikesData';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { PedestrianData } from '../models/PedestrianData';
import { AqiData, AqiStation } from '../models/AqiData';
import { DublinBikesData } from '../models/DublinBikesData';

describe('SearchFilterPipe', () => {
  let pipe:SearchFilterPipe;
  
  beforeEach(() => {
    pipe = new SearchFilterPipe();
  })

describe('SearchFilterPipe', () => {
  let pipe: SearchFilterPipe;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchFilterPipe ],
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

  it('should only show pedestrian data with "Grafton" in the name', () => {
    pipe = new SearchFilterPipe();
    let pedOne = new PedestrianData();
    pedOne["street"] = "Grafton St."
    let pedTwo = new PedestrianData();
    pedTwo["street"] = "Dawson St."

    let input:PedestrianData[] = [pedOne, pedTwo];
    let searchText = 'grafton'
    expect(pipe.transform(input, searchText).length).toEqual(1);
  });

  it('should only show aqi data with "Grafton" in the station name', () => {
    pipe = new SearchFilterPipe();
    let aqiOne = new AqiData();
    aqiOne["station"] = new AqiStation();
    aqiOne["station"]["name"] = "Grafton St."
    let aqiTwo = new AqiData();
    aqiTwo["station"] = new AqiStation();
    aqiTwo["station"]["name"] = "Dawson St."

    let input:AqiData[] = [aqiOne, aqiTwo];
    let searchText = 'grafton'
    expect(pipe.transform(input, searchText).length).toEqual(1);
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
  
  
  it('should only show bike data with "Grafton" in the station name', () => {
    pipe = new SearchFilterPipe();
    let bikeOne = new DublinBikesData();
    bikeOne["name"] = "Grafton St."
    let bikeTwo = new DublinBikesData();
    bikeTwo["name"] = "Dawson St."

    let input:DublinBikesData[] = [bikeOne, bikeTwo];
    let searchText = 'grafton'
    expect(pipe.transform(input, searchText).length).toEqual(1);
  });

});

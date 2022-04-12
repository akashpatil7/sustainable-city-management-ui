import { TestBed } from '@angular/core/testing';
import { SearchFilterPipe } from './search-filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { PedestrianData } from '../models/PedestrianData';
import { AqiData, AqiStation } from '../models/AqiData';
import { DublinBikesData } from '../models/DublinBikesData';

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

  it('providing no search value returns full array', () => {
    pipe = new SearchFilterPipe();
    let pedOne = new PedestrianData();
    pedOne["street"] = "Grafton St."
    let pedTwo = new PedestrianData();
    pedTwo["street"] = "Dawson St."

    let input:PedestrianData[] = [pedOne, pedTwo];
    expect(pipe.transform(input, " ")).toHaveSize(2)
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

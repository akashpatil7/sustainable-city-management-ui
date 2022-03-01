import { AqiSearchFilterPipe } from './aqi-search-filter.pipe';
import { SearchFilterPipe } from './search-filter.pipe';

describe('SearchFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new SearchFilterPipe();
    expect(pipe).toBeTruthy();
  });
});

describe('AqiSearchFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new AqiSearchFilterPipe();
    expect(pipe).toBeTruthy();
  });
});

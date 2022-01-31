import { TestBed } from '@angular/core/testing';

import { TrendsService } from './trends.service';

import { HttpClientModule } from '@angular/common/http';

describe('TrendsService', () => {
  let service: TrendsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientModule
      ]
    });
    service = TestBed.inject(TrendsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

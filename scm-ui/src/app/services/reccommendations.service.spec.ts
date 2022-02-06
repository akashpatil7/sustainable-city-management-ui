import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { RecommendationsService } from './recommendations.service';

describe('RecommendationsService', () => {
  let service: RecommendationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports:[
      HttpClientModule
    ]});
    service = TestBed.inject(RecommendationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

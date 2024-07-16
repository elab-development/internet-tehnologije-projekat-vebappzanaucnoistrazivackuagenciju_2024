import { TestBed } from '@angular/core/testing';

import { PublicationResearcherService } from './publication-researcher.service';

describe('PublicationResearcherService', () => {
  let service: PublicationResearcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicationResearcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

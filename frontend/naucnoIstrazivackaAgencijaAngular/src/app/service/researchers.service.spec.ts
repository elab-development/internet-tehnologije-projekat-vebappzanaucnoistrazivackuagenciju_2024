import { TestBed } from '@angular/core/testing';

import { ResearchersService } from './researchers.service';

describe('ResearchersService', () => {
  let service: ResearchersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResearchersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

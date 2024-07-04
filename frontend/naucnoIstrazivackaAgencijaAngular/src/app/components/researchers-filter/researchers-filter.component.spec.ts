import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchersFilterComponent } from './researchers-filter.component';

describe('ResearchersFilterComponent', () => {
  let component: ResearchersFilterComponent;
  let fixture: ComponentFixture<ResearchersFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResearchersFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResearchersFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

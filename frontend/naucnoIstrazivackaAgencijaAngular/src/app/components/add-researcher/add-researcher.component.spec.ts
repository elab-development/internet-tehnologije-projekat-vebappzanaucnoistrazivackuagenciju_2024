import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResearcherComponent } from './add-researcher.component';

describe('AddResearcherComponent', () => {
  let component: AddResearcherComponent;
  let fixture: ComponentFixture<AddResearcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddResearcherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddResearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

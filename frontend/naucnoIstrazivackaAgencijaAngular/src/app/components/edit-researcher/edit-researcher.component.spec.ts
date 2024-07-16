import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditResearcherComponent } from './edit-researcher.component';

describe('EditResearcherComponent', () => {
  let component: EditResearcherComponent;
  let fixture: ComponentFixture<EditResearcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditResearcherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditResearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

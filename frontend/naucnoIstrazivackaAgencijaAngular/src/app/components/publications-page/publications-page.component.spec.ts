import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationsPageComponent } from './publications-page.component';

describe('PublicationsPageComponent', () => {
  let component: PublicationsPageComponent;
  let fixture: ComponentFixture<PublicationsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicationsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

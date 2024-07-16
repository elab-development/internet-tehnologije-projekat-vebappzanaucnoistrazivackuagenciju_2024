import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityCmbComponent } from './city-cmb.component';

describe('CityCmbComponent', () => {
  let component: CityCmbComponent;
  let fixture: ComponentFixture<CityCmbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CityCmbComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CityCmbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

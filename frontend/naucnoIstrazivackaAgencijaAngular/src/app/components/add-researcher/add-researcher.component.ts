import { Component, OnInit } from '@angular/core';
import { ResearcherInfoComponent } from '../researcher-info/researcher-info.component';
import { City } from '../../domain/city.domain';
import { ResearchersService } from '../../service/researchers.service';
import { CitiesService } from '../../service/cities.service';
import { ActivatedRoute } from '@angular/router';
import { Researcher } from '../../domain/researcher.domain';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-researcher',
  standalone: true,
  imports: [ResearcherInfoComponent],
  template:`
  <app-researcher-info
      [cities]="cities"
      (researcherEmitter)="saveResearcher($event)"
    ></app-researcher-info>
  `,
  styleUrl: './add-researcher.component.scss'
})
export class AddResearcherComponent implements OnInit{
  cities: City[] = [];
  constructor(
    private location: Location,
    private researchersService: ResearchersService,
    private citiesService: CitiesService
  ) {}
  ngOnInit(): void {
    this.citiesService.getAll().subscribe((x) => {
      this.cities = x;
      this.cities.unshift({ id: -1, name: '-- Select --' });
    });
  }
  saveResearcher($event: Researcher) {
    this.researchersService.saveResearcher($event).pipe().subscribe(x=>{
      console.log("============ID:=============");
      console.log(x.id);
      this.location.back();
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ResearchersFilterComponent } from '../../components/researchers-filter/researchers-filter.component';
import { City } from '../../domain/city.domain';
import { ResearcherFilter } from '../../domain/researchersFilter';
import { ResearchersService } from '../../service/researchers.service';
import { CitiesService } from '../../service/cities.service';
import { ResearchersPageComponent } from '../../components/researchers-page/researchers-page.component';
import { Researcher } from '../../domain/researcher.domain';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-researchers',
  standalone: true,
  imports: [ResearchersFilterComponent, ResearchersPageComponent,RouterLink,RouterLinkActive],
  template: `
    <app-researchers-filter
      [cities]="cities"
      (filterChanged)="filterChanged($event)"
    ></app-researchers-filter>
    <br />
    <!-- <br /> -->
    <app-researchers-page
      [currentPage]="page"
      [totalPages]="totalPages"
      [researchers]="researchers"
      (outputPageSize)="sizeChanged($event)"
      (outputCurrentPage)="pageChanged($event)"
      [routeToResearchers]="'..'"
    ></app-researchers-page>
    <br />
    <br />
    <a routerLink="../researchers/add" routerLinkActive="active"
      >Add New Researcher</a>
  `,
  styleUrl: './researchers.component.scss',
})
export class ResearchersComponent implements OnInit{
  researchers: Researcher[] = [];
  cities: City[] = [];
  page: number = 1; //uzeti iz podkomponente
  size: number = 10; //uzeo
  researcherFilter: ResearcherFilter = {
    cityId: -1,
  }; //uzeo
  totalPages: number = 1;
  constructor(
    private researchersService: ResearchersService,
    private citiesService: CitiesService
  ) {}
  ngOnInit(): void {
    this.researchersService
      .getResearchersPage(1, 10, this.researcherFilter)
      .subscribe((x) => {
        this.researchers = x.data;
        this.totalPages = x.meta.last_page;
        this.size = x.meta.per_page;
      });

    this.citiesService
      .getAll()
      // .pipe(catchError(x))
      .subscribe((x) => {
        // console.log('-----------------------');
        // console.log(x?.length);
        this.cities = x;
        this.cities.unshift({ id: -1, name: '-- Select --' });
      });
  }

  pageChanged(newPage: number): void {
    this.page = newPage;
    this.researchersService
      .getResearchersPage(newPage, this.size, this.researcherFilter)
      .subscribe((x) => {
        this.researchers = x.data;
      });
  }

  sizeChanged(newSize: number): void {
    console.log("logika:" + newSize);
    this.size = newSize;
    this.researchersService
      .getResearchersPage(1, newSize, this.researcherFilter)
      .subscribe((x) => {
        this.page = 1;
        console.log("subscribe:" + this.size);
        this.researchers = x.data;
        this.totalPages = x.meta.last_page;
        console.log("x.data.length: ")
        console.log(x.data.length)
      });
  }

  filterChanged(newFilter: ResearcherFilter): void {
    this.researcherFilter = newFilter;
    this.researchersService
      .getResearchersPage(1, this.size, this.researcherFilter)
      .subscribe((x) => {
        this.page = 1;
        this.researchers = x.data;
        this.totalPages = x.meta.last_page;
      });
  }
}

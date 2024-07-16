import { Component, OnChanges, OnInit } from '@angular/core';
import { ResearcherInfoComponent } from '../researcher-info/researcher-info.component';
import { Researcher } from '../../domain/researcher.domain';
import { City } from '../../domain/city.domain';
import { ResearchersService } from '../../service/researchers.service';
import { CitiesService } from '../../service/cities.service';
import { ActivatedRoute } from '@angular/router';
import { PublicationResearcher } from '../../domain/publicationResearcher.domain';
import { PublicationResearcherService } from '../../service/publication-researcher.service';
import { PublicationsPageComponent } from '../publications-page/publications-page.component';
import { Publication } from '../../domain/publication.domain';
import { map } from 'rxjs';
import { Page } from '../../domain/page';

@Component({
  selector: 'app-edit-researcher',
  standalone: true,
  imports: [ResearcherInfoComponent, PublicationsPageComponent],
  template: `
    <h2>Researcher {{ researcher.firstname }} {{ researcher.lastname }}</h2>
    <!-- <h2>Researcher {{ researcher?.firstname }} {{ researcher?.lastname }}</h2> -->
    <app-researcher-info
      [cities]="cities"
      (researcherEmitter)="updateResearcher($event)"
      [researcher]="researcher"
    ></app-researcher-info>

    <br />
    <app-publications-page
    [currentPage]="page"
    [totalPages]="totalPages"
    [publications]="publications"
    [routeToPublications]="'../..'"
    (outputCurrentPage)="pageChanged($event)"
    (outputPageSize)="sizeChanged($event)"
    ></app-publications-page>
    <br />
    <br />
    <br />
    <br />

  `,
  styleUrl: './edit-researcher.component.scss',
})
export class EditResearcherComponent implements OnInit, OnChanges {
  id!: number;
  // researcher!: Researcher;
  // u ovom slucaju ne daje exception, ali gore mora ?.
  researcher: Researcher = {
    firstname: '',
    lastname: '',
    city: { id: -1, name: '' },
    birthday: new Date(1, 1, 1),
  };
  cities: City[] = [];
  publicationResearchers: PublicationResearcher[] = [];

  publications: Publication[] = [];
  page: number = 1; //uzeti iz podkomponente
  size: number = 10; //uzeo
  totalPages: number = 1;

  constructor(
    private researchersService: ResearchersService,
    private citiesService: CitiesService,
    private publicationResearcherService: PublicationResearcherService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = +params['id'];
      console.log("ssssssssssssss   "+this.id+"   ssssssssssss")
      this.publicationResearcherService
        .getPublicationResearchersByResearcherIdPage(this.page, this.size, this.id)
        //ulazi stranica sa data:PublicationResearcher
        // pipe(map()).
        .pipe(
          map((pageData: Page<PublicationResearcher>) => {
            return {
              ...pageData,
              data: pageData.data.map((pr) => ({
                id: pr.publication.id,
                text:pr.publication.text,
                name: pr.publication.name,
                date: pr.publication.date,
              })),
            };
          })
        )
        .subscribe((x) => {
          this.publications = x.data;
          this.totalPages = x.meta.last_page;
          this.size = x.meta.per_page;
        });
    });
    this.researchersService.getResearcher(this.id).subscribe((x) => {
      this.researcher = x;
      console.log('iz edit comp: ' + this.researcher.birthday);
    });
    this.citiesService.getAll().subscribe((x) => {
      this.cities = x;
      this.cities.unshift({ id: -1, name: '-- Select --' });
    });
  }
  ngOnChanges(): void {

  }

  pageChanged(newPage: number): void {
    this.page = newPage;
    this.publicationResearcherService
      .getPublicationResearchersByResearcherIdPage(newPage, this.size, this.id)
      .pipe(
        map((pageData: Page<PublicationResearcher>) => {
          return {
            ...pageData,
            data: pageData.data.map((pr) => ({
              id: pr.publication.id,
              text:pr.publication.text,
              name: pr.publication.name,
              date: pr.publication.date,
            })),
          };
        })
      )
      .subscribe((x) => {
        this.publications = x.data;
      });
  }

  sizeChanged(newSize: number): void {
    console.log('logika:' + newSize);
    this.size = newSize;
    this.publicationResearcherService
      .getPublicationResearchersByResearcherIdPage(1, newSize, this.id)
      .pipe(
        map((pageData: Page<PublicationResearcher>) => {
          return {
            ...pageData,
            data: pageData.data.map((pr) => ({
              id: pr.publication.id,
              text:pr.publication.text,
              name: pr.publication.name,
              date: pr.publication.date,
            })),
          };
        })
      )
      .subscribe((x) => {
        this.page = 1;
        console.log('subscribe:' + this.size);
        this.publications = x.data;
        this.totalPages = x.meta.last_page;
        console.log('x.data.length: ');
        console.log(x.data.length);
      });
  }

  updateResearcher($event: Researcher) {
    // ovo izmeniti jer vraca novi researcher umesto da update stari
    $event.id = this.id;
    this.researchersService
      .updateResearcher($event)
      .pipe()
      .subscribe((x) => {
        console.log('============ID:=============');
        console.log(x.id);
        // this.location.back();
      });
  }
}

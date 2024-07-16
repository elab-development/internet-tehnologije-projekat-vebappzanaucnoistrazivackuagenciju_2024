import { Component } from '@angular/core';
import { Publication } from '../../domain/publication.domain';
import { PublicationsPageComponent } from '../../components/publications-page/publications-page.component';
import { PublicationsService } from '../../service/publications.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-publications',
  standalone: true,
  imports: [PublicationsPageComponent,RouterLink,RouterLinkActive],
  template:`
  <br />
    <!-- <br /> -->
    <app-publications-page
      [currentPage]="page"
      [totalPages]="totalPages"
      [publications]="publications"
      (outputPageSize)="sizeChanged($event)"
      (outputCurrentPage)="pageChanged($event)"
      [routeToPublications]="'..'"
    ></app-publications-page>
    <br />
    <br />
    <a routerLink="../publications/add" routerLinkActive="active"
      >Add New Publication</a
    >
  `,
  styleUrl: './publications.component.scss'
})
export class PublicationsComponent {
  publications:Publication[]=[];
  page: number = 1; //uzeti iz podkomponente
  size: number = 10; //uzeo
  totalPages: number = 1;
  constructor(
    private publicationsService: PublicationsService
  ) {}
  ngOnInit(): void {
    this.publicationsService
      .getPublicationsPage(1, 10)
      .subscribe((x) => {
        this.publications = x.data;
        this.totalPages = x.meta.last_page;
        this.size = x.meta.per_page;
      });
  }

  pageChanged(newPage: number): void {
    this.page = newPage;
    this.publicationsService
      .getPublicationsPage(newPage, this.size)
      .subscribe((x) => {
        this.publications = x.data;
      });
  }

  sizeChanged(newSize: number): void {
    console.log("logika:" + newSize);
    this.size = newSize;
    this.publicationsService
      .getPublicationsPage(1, newSize)
      .subscribe((x) => {
        this.page = 1;
        console.log("subscribe:" + this.size);
        this.publications = x.data;
        this.totalPages = x.meta.last_page;
        console.log("x.data.length: ")
        console.log(x.data.length)
      });
  }
}

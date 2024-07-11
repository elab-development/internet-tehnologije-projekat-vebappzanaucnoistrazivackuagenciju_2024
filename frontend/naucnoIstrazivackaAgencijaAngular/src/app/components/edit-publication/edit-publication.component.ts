import { Component, OnInit } from '@angular/core';
import { PublicationInfoComponent } from '../publication-info/publication-info.component';
import { Publication } from '../../domain/publication.domain';
import { PublicationsService } from '../../service/publications.service';
import { ActivatedRoute } from '@angular/router';
import { ReferencesComponent } from '../references/references.component';
import { AuthorsComponent } from '../authors/authors.component';
import { PublicationFullInfo } from '../../domain/publicationFullInfo';
import { Reference } from '../../domain/reference.domain';
import { Location } from '@angular/common';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-edit-publication',
  standalone: true,
  imports: [PublicationInfoComponent,ReferencesComponent,AuthorsComponent],
  template: `
    <h2>Publication {{ publication.name }}</h2>
    <app-publication-info
      (publicationEmitter)="updatePublication($event)"
      [publication]="publication"
    ></app-publication-info>
    <app-references
      [publication]="publication"
      [publicationId]="id"
      (referenceEmitter)="fillReferencesInfo($event)"
      ></app-references>
      <br />
      <app-authors
      [publication]="publication"
      [publicationId]="id"
      (authorsEmitter)="fillAuthorsInfo($event)"
    ></app-authors>

    <br />
    <button (click)="updatePublicationFullInfo()">Save</button>
    <br />
    <br />
    <br />
    <br />
    <br />
  `,
  styleUrl: './edit-publication.component.scss'
})
export class EditPublicationComponent implements OnInit{
  id!: number;
  publication: Publication = {
    name: '',
    text: '',
    date: new Date(1, 1, 1),
  };
  publicationFullInfo: PublicationFullInfo = {
    publication: this.publication,
    publicationResearchersToDelete: [],
    publicationResearchersToSave: [],
    referencesToSave: [],
    referencesToDelete: [],
  };
  constructor(
    private publicationsService: PublicationsService,
    private activatedRoute: ActivatedRoute,
    private location:Location
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = +params['id'];
      // console.log('ssssssssssssss   ' + this.id + '   ssssssssssss');

      this.publicationsService.getPublication(this.id).subscribe((x) => {
        this.publication = x;
      });
    });
  }
  updatePublication($event: Publication) {
    $event.id = this.id;
    console.log("+++++++ edite comp ++++");
    this.publicationFullInfo.publication = $event;
    this.publication = $event;
    console.log(JSON.stringify(this.publicationFullInfo));

}
fillAuthorsInfo($event: {
  publicationResearchersToSave: import('../../domain/publicationResearcher.domain').PublicationResearcher[];
  publicationResearchersToDelete: import('../../domain/publicationResearcher.domain').PublicationResearcher[];
}) {
  console.log('this.fillAuthorsInfo');
  console.log(JSON.stringify($event));
  this.publicationFullInfo.publicationResearchersToSave =
    $event.publicationResearchersToSave.map((author) => ({
      researcher_id: author.researcher.id!,
    }));
  this.publicationFullInfo.publicationResearchersToDelete =
    $event.publicationResearchersToDelete.map((author) => ({
      researcher_id: author.researcher.id!,
    }));
}

fillReferencesInfo($event: {
  referencesToSave: Reference[];
  referencesToDelete: Reference[];
}) {
  console.log('this.fillReferencesInfo');
  console.log(JSON.stringify($event));
  this.publicationFullInfo.referencesToSave = $event.referencesToSave.map(
    (reference) => ({
      referenced_id: reference.referenced.id!,
    })
  );
  this.publicationFullInfo.referencesToDelete = $event.referencesToDelete.map(
    (reference) => ({
      referenced_id: reference.referenced.id!,
    })
  );
    console.log(JSON.stringify(this.publicationFullInfo));
}

fillPublicationInfo($event: Publication) {
  console.log('this.fillPublicationInfo');
  console.log(JSON.stringify($event));
  this.publicationFullInfo.publication = $event;
  console.log("A SAD PRAVA");
  console.log(JSON.stringify(this.publicationFullInfo.publication));
}
updatePublicationFullInfo() {
  this.publicationFullInfo.publication = this.publication;
  this.publicationsService
    .updatePublicationFullInfo(this.publicationFullInfo)
    .pipe(catchError((err) => {
      console.error('Error occurred:', err);
      // Handle the error appropriately here, e.g., show a message to the user
      return of("Greska"); // Return an empty array or any other fallback value
    }))
    .subscribe((x) => {
      console.log(x);
      this.location.back();
    });
}
}

import { Component } from '@angular/core';
import { PublicationInfoComponent } from '../publication-info/publication-info.component';
import { Publication } from '../../domain/publication.domain';
import { PublicationsService } from '../../service/publications.service';
import { Location } from '@angular/common';
import { ReferencesComponent } from '../references/references.component';
import { Reference } from '../../domain/reference.domain';
import { PublicationFullInfo } from '../../domain/publicationFullInfo';
import { AuthorsComponent } from '../authors/authors.component';

@Component({
  selector: 'app-add-publication',
  standalone: true,
  imports: [PublicationInfoComponent, ReferencesComponent, AuthorsComponent],
  template: `
    <!-- (publicationEmitter)="savePublication($event)" -->
    <app-publication-info
      (publicationEmitter)="fillPublicationInfo($event)"
    ></app-publication-info>
    <app-references
      [publication]="publication"
      (referenceEmitter)="fillReferencesInfo($event)"
    ></app-references>
    <br />
    <app-authors
      [publication]="publication"
      (authorsEmitter)="fillAuthorsInfo($event)"
    ></app-authors>

    <br />
    <button (click)="savePublicationFullInfo()">Save</button>
  `,
  styleUrl: './add-publication.component.scss',
})
export class AddPublicationComponent {
  savePublicationFullInfo() {
    this.publicationsService
      .savePublicationFullInfo(this.publicationFullInfo)
      .pipe()
      .subscribe((x) => {
        this.location.back();
      });
  }
  
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
    public publicationsService: PublicationsService,
    public location: Location
  ) {}

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
  }

  fillPublicationInfo($event: Publication) {
    console.log('this.fillPublicationInfo');
    console.log(JSON.stringify($event));
    this.publicationFullInfo.publication = $event;
  }
  savePublication($event: Publication) {
    // this.publication = $event;
    this.publicationsService
      .savePublication($event)
      .pipe()
      .subscribe((x) => {
        console.log('============ID:=============');
        console.log(x.id);
        this.location.back();
      });
  }
}

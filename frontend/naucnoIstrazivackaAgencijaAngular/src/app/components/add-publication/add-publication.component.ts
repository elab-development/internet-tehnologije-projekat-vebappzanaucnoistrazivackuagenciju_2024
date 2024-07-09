import { Component } from '@angular/core';
import { PublicationInfoComponent } from '../publication-info/publication-info.component';
import { Publication } from '../../domain/publication.domain';
import { PublicationsService } from '../../service/publications.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-publication',
  standalone: true,
  imports: [PublicationInfoComponent],
  template: `
    <app-publication-info
      (publicationEmitter)="savePublication($event)"
    ></app-publication-info>
  `,
  styleUrl: './add-publication.component.scss',
})
export class AddPublicationComponent {
  constructor(
    public publicationsService: PublicationsService,
    public location: Location
  ) {}

  savePublication($event: Publication) {
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
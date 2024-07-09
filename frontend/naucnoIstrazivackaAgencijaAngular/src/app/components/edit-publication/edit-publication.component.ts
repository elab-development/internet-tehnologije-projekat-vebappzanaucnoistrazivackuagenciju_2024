import { Component, OnInit } from '@angular/core';
import { PublicationInfoComponent } from '../publication-info/publication-info.component';
import { Publication } from '../../domain/publication.domain';
import { PublicationsService } from '../../service/publications.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-publication',
  standalone: true,
  imports: [PublicationInfoComponent],
  template: `
    <h2>Publication {{ publication.name }}</h2>
    <app-publication-info
      (publicationEmitter)="updatePublication($event)"
      [publication]="publication"
    ></app-publication-info>

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
  constructor(
    private publicationsService: PublicationsService,
    private activatedRoute: ActivatedRoute
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
    this.publicationsService
      .updatePublication($event)
      .pipe()
      .subscribe((x) => {
        console.log('============ID:=============');
        console.log(x.id);
        // this.location.back();
      });
  }

}

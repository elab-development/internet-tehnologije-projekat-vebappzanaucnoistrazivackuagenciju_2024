import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {
  Observable
} from 'rxjs';
import { PublicationsService } from '../service/publications.service';
import { Publication } from '../domain/publication.domain';

@Component({
  selector: 'app-add-reference-hi',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AsyncPipe],
  template: `
    <div class="popup">
      <h3>Add Reference</h3>
      <ul>
        <li
          *ngFor="let publication of publications$ | async"
          (click)="add(publication)"
        >
          {{ publication.id }} {{ publication.name }}
          {{ publication.date }}
        </li>
      </ul>
      <button (click)="close()">Close</button>
    </div>
  `,
  styles: [],
})
export class AddReferencePopup {
  constructor(
    public dialogRef: MatDialogRef<AddReferencePopup>,
    public publicationService: PublicationsService
  ) {}
  publications$!: Observable<Publication[]>;
  ngOnInit() {
    this.publications$ = this.publicationService.getAll();
  }
  close(): void {
    this.dialogRef.close(null);
  }
  add(publication: Publication): void {
    this.dialogRef.close(publication);
  }
}

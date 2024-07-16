import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {
  Observable
} from 'rxjs';
import { PublicationsService } from '../service/publications.service';
import { Publication } from '../domain/publication.domain';
import { Researcher } from '../domain/researcher.domain';
import { ResearchersService } from '../service/researchers.service';

@Component({
  selector: 'app-add-author-hi',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AsyncPipe],
  template: `
    <div class="popup">
      <h3>Add Authors</h3>
      <ul>
        <li
          *ngFor="let researcher of researchers$ | async"
          (click)="add(researcher)"
        >
          {{ researcher.id }} {{ researcher.firstname }}
          {{ researcher.lastname }} {{ researcher.birthday }}
        </li>
      </ul>
      <button (click)="close()">Close</button>
    </div>
  `,
  styles: [],
})
export class AddAuthorsPopup {
  constructor(
    public dialogRef: MatDialogRef<AddAuthorsPopup>,
    public researchersService: ResearchersService
  ) {}
  researchers$!: Observable<Researcher[]>;
  ngOnInit() {
    this.researchers$ = this.researchersService.getAll();
  }
  close(): void {
    this.dialogRef.close(null);
  }
  add(researcher: Researcher): void {
    this.dialogRef.close(researcher);
  }
}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Publication } from '../../domain/publication.domain';
import { DateHelperService } from '../../service/date-helper.service';
import { MatDialog } from '@angular/material/dialog';
import { AddAuthorsPopup } from '../add-authors-to-publication-popup';
import { PublicationResearcher } from '../../domain/publicationResearcher.domain';
import { PublicationResearcherService } from '../../service/publication-researcher.service';
import { catchError } from 'rxjs';
import { Researcher } from '../../domain/researcher.domain';

@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  template: ` <h3>Authors:</h3>
    <form [formGroup]="form">
      <table>
        <thead>
          <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Birthday</th>
            <th>City</th>
            <th>X</th>
          </tr>
        </thead>
        <tbody formArrayName="publicationResearchers">
          <tr
            *ngFor="let item of publicationResearchers.controls; let i = index"
            [formGroupName]="i"
          >
            <td>
              <input
                type="text"
                placeholder=""
                readonly
                formControlName="firstname"
              />
            </td>
            <td>
              <input
                type="text"
                placeholder=""
                readonly
                formControlName="lastname"
              />
            </td>
            <td>
              <input
              type="text"
              readonly
              placeholder="DD.MM.YYYY"
              formControlName="birthday"
              id="date-{{ i }}"
              />
            </td>
            <td>
              <input
                type="text"
                placeholder=""
                readonly
                formControlName="city"
              />
            </td>
            <td><button (click)="deleteAuthor(i)">X</button></td>
          </tr>
        </tbody>
      </table>
    </form>
    <button (click)="addClicked()">Add New Author</button>`,
  styleUrl: './authors.component.scss',
})
export class AuthorsComponent {
  publicationResearchersNiz: PublicationResearcher[] = [];
  addedItems: PublicationResearcher[] = [];
  deleteItems: PublicationResearcher[] = [];

  form: FormGroup;

  @Output() authorsEmitter: EventEmitter<{
    publicationResearchersToSave: PublicationResearcher[];
    publicationResearchersToDelete: PublicationResearcher[];
  }> = new EventEmitter();
  @Input() publicationId?: number;
  @Input() publication: Publication = {
    name: '',
    text: '',
    date: new Date(1, 1, 1),
  };
  @Input() publications: Publication[]=[];
  constructor(
    private publicationResearcherService: PublicationResearcherService,
    private formBuilder: FormBuilder,
    public dateHelper: DateHelperService,
    public popup: MatDialog
  ) {
    this.form = this.formBuilder.group({
      publicationResearchers: this.formBuilder.array([]),
    });
  }
  ngOnInit(): void {
    if (!this.publicationId) return;
    else{
      console.log("---------------");
      console.log("prosledjeni id publikacije u komponenti Authors: "+this.publicationId);
      this.publicationResearcherService
        .getPublicationResearchersByPublicationId(this.publicationId)
        .pipe(
          catchError((err) => {
            // console.log('PROBLEM');
            throw Error;
          })
        )
        .subscribe((x) => {
          this.publicationResearchersNiz = x;
          // console.log(JSON.stringify(x,null,2))
          this.fillTable(x);
        });
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    
  }
  addClicked(): void {
    console.log("kliknuo sam add. duzina liste je sledeca: "+this.publicationResearchersNiz.length);
    this.openPopup();
  }
  openPopup(): void {
    const dialogRef = this.popup.open(AddAuthorsPopup, {
      width: '343px',
      // height:'250px',
      id: 'chooseTitle',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed with result:', result);
      console.log('Rezultet je tipa Researcher');
      if (result !== null && this.validateNewResearcher(result)) {
        this.addResearcher(result);
      }
    });
  }
  deleteAuthor(i: number): void {
    //samo iz niza i iz kontrola
    this.publicationResearchers.removeAt(i); //iz kontrole
    let deletedItem: PublicationResearcher | undefined = this.publicationResearchersNiz.at(i);
    // da li je vec bila u nizu referenci ili je samo dodata i obrisana

    if (
      this.addedItems.find(
        (x) => x.researcher.id === deletedItem?.researcher.id
      )
    ) {
      this.addedItems = this.addedItems.filter(
        (x) => x.researcher.id !== deletedItem?.researcher.id
      );
      console.log("--------------------------");
    console.log(
      JSON.stringify(
        {
          publicationResearchersToSave: this.addedItems,
          publicationResearchersToDelete: this.deleteItems,
        },
        null,
        2
      )
    );
    this.authorsEmitter.emit({
      publicationResearchersToSave: this.addedItems,
      publicationResearchersToDelete: this.deleteItems,
    });
    } else {
      if (deletedItem) {
        this.deleteItems.push(deletedItem);
        console.log("--------------------------");
    console.log(
      JSON.stringify(
        {
          publicationResearchersToSave: this.addedItems,
          publicationResearchersToDelete: this.deleteItems,
        },
        null,
        2
      )
    );
    this.authorsEmitter.emit({
      publicationResearchersToSave: this.addedItems,
      publicationResearchersToDelete: this.deleteItems,
    });
      }
    }
    this.publicationResearchersNiz.splice(i, 1);
  }

  private addResearcher(res: Researcher) {
    let newPublicationResearcher: PublicationResearcher = {
      publication: this.publication,
      researcher: res,
    };
    console.log(newPublicationResearcher);
    this.addItemToArray(newPublicationResearcher);
    this.publicationResearchersNiz.push(newPublicationResearcher);
    this.addedItems.push(newPublicationResearcher);
    // console.log(JSON.stringify({toSave: this.updateItems,toDelete: this.deleteItems,allItems:this.employeeATHistory},null,2));
    console.log("--------------------------");
    console.log(
      JSON.stringify(
        {
          publicationResearchersToSave: this.addedItems,
          publicationResearchersToDelete: this.deleteItems,
        },
        null,
        2
      )
    );
    this.authorsEmitter.emit({
      publicationResearchersToSave: this.addedItems,
      publicationResearchersToDelete: this.deleteItems,
    });
  }
  addItemToArray(item: PublicationResearcher): void {
    this.publicationResearchers.push(this.createItemGroup(item));
  }
  get publicationResearchers(): FormArray {
    return this.form.get('publicationResearchers') as FormArray;
  }
  createItemGroup(item: PublicationResearcher): FormGroup {
    return this.formBuilder.group({
      firstname: [item.researcher.firstname],
      lastname: [item.researcher.lastname],
      birthday: [item.researcher.birthday],
      city: [item.researcher.city.name]
    });
  }
  fillTable(items: PublicationResearcher[]): void {
    items.forEach((item) => {
      this.addItemToArray(item);
    });
  }
  validateNewResearcher(resForCheck: Researcher): boolean {
    if (this.publicationResearchersNiz.length < 1) return true;
    let result = true;
    this.publicationResearchersNiz.forEach((element) => {
      if (element.researcher.id === resForCheck.id) {
        result = false;
      }
    });
    return result;
  }
}

import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Reference } from '../../domain/reference.domain';
import { Publication } from '../../domain/publication.domain';
import { DateHelperService } from '../../service/date-helper.service';
import { ReferencesService } from '../../service/references.service';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
} from '@angular/material/dialog';
import { catchError } from 'rxjs';
import { AddReferencePopup } from '../add-reference-to-publication-popup';
@Component({
  selector: 'app-references',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <h3>References:</h3>
    <form [formGroup]="form">
      <table>
        <thead>
          <tr>
            <th>Publication</th>
            <th>Date</th>
            <th>X</th>
          </tr>
        </thead>
        <tbody formArrayName="references">
          <tr
            *ngFor="let item of referencesFormArray.controls; let i = index"
            [formGroupName]="i"
          >
            <td>
              <input
                type="text"
                placeholder=""
                readonly
                formControlName="title"
              />
            </td>
            <td>
              <input
                type="text"
                readonly
                placeholder="DD.MM.YYYY"
                formControlName="date"
                id="date-{{ i }}"
              />
            </td>
            <td><button (click)="deleteReference(i)">X</button></td>
          </tr>
        </tbody>
      </table>
    </form>
    <button (click)="addClicked()">Add New Reference</button>
    <!-- <br /> -->
    <!-- <button (click)="saveTitles()">Save Titles</button> -->
  `,
  styleUrl: './references.component.scss',
})
export class ReferencesComponent implements OnInit, OnChanges {
  references: Reference[] = [];
  addedItems: Reference[] = [];
  deleteItems: Reference[] = [];

  form: FormGroup;

  @Output() referenceEmitter: EventEmitter<{
    referencesToSave: Reference[];
    referencesToDelete: Reference[];
  }> = new EventEmitter();
  @Input() publicationId?: number;
  @Input() publication: Publication = {
    name: '',
    text: '',
    date: new Date(1, 1, 1),
  };
  @Input() publications: Publication[] = [];
  constructor(
    private referencesService: ReferencesService,
    private formBuilder: FormBuilder,
    public dateHelper: DateHelperService,
    public popup: MatDialog
  ) {
    this.form = this.formBuilder.group({
      references: this.formBuilder.array([]),
    });
  }
  ngOnInit(): void {
    if (!this.publicationId) return;
    else {
      console.log('---------------');
      console.log(
        'prosledjeni id publikacije u komponenti Reference: ' +
          this.publicationId
      );
      this.referencesService
        .getReferencesByPublicationId(this.publicationId)
        .pipe(
          catchError((err) => {
            // console.log('PROBLEM');
            throw Error;
          })
        )
        .subscribe((x) => {
          this.references = x;
          // console.log(JSON.stringify(x,null,2))
          this.fillTable(x);
        });
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log("--------------Promena------------");
    // console.log(
    //   JSON.stringify(
    //     {
    //       referencesToSave: this.addedItems,
    //       referencesToDelete: this.deleteItems,
    //     },
    //     null,
    //     2
    //   )
    // );
    // this.referenceEmitter.emit({
    //   referencesToSave: this.addedItems,
    //   referencesToDelete: this.deleteItems,
    // });
  }
  addClicked(): void {
    console.log(
      'kliknuo sam add. duzina liste titula je sledeca: ' +
        this.references.length
    );
    this.openPopup();
  }
  openPopup(): void {
    const dialogRef = this.popup.open(AddReferencePopup, {
      width: '343px',
      // height:'250px',
      id: 'chooseTitle',
      disableClose: true,
      // data: { academicTitles: this.academicTitles, employee: this.employee },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed with result:', result);
      console.log('Rezultet je tipa PUBLIKACIJA');
      if (result !== null && this.validateNewReferencedPublication(result)) {
        this.addReference(result);
      }
    });
  }
  deleteReference(i: number): void {
    //samo iz niza i iz kontrola
    this.referencesFormArray.removeAt(i); //iz kontrole
    let deletedItem: Reference | undefined = this.references.at(i);
    // da li je vec bila u nizu referenci ili je samo dodata i obrisana

    if (
      this.addedItems.find(
        (x) => x.referenced.id === deletedItem?.referenced.id
      )
    ) {
      this.addedItems = this.addedItems.filter(
        (x) => x.referenced.id !== deletedItem?.referenced.id
      );
      console.log("--------------Promena-IZBACI IZ NIZA -----------");
    console.log(
      JSON.stringify(
        {
          referencesToSave: this.addedItems,
          referencesToDelete: this.deleteItems,
        },
        null,
        2
      )
    );
    this.referenceEmitter.emit({
      referencesToSave: this.addedItems,
      referencesToDelete: this.deleteItems,
    });
    } else {
      if (deletedItem) {
        this.deleteItems.push(deletedItem);
        console.log('--------------Promena------------');
        console.log(
          JSON.stringify(
            {
              referencesToSave: this.addedItems,
              referencesToDelete: this.deleteItems,
            },
            null,
            2
          )
        );
        this.referenceEmitter.emit({
          referencesToSave: this.addedItems,
          referencesToDelete: this.deleteItems,
        });
      }
    }
    this.references.splice(i, 1);
  }

  private addReference(publ: Publication) {
    let newReference: Reference = {
      publication: this.publication, //u comp ADDPublication, publication polje je genericko i bez id
      referenced: publ,
    };
    console.log('#########   Nova referenca: #########');
    console.log(JSON.stringify(newReference));

    this.addItemToArray(newReference);
    console.log(
      '#########   Stara dimenzija nizova:  #########' +
        this.references.length +
        '  ---  ' +
        this.addedItems.length
    );
    this.references.push(newReference);
    this.addedItems.push(newReference);
    console.log(
      '#########   Nova dimenzija nizova:  #########' +
        this.references.length +
        '  ---  ' +
        this.addedItems.length
    );
    // console.log(JSON.stringify({toSave: this.updateItems,toDelete: this.deleteItems,allItems:this.employeeATHistory},null,2));
    console.log('--------------Promena------------');
    console.log(
      JSON.stringify(
        {
          referencesToSave: this.addedItems,
          referencesToDelete: this.deleteItems,
        },
        null,
        2
      )
    );
    this.referenceEmitter.emit({
      referencesToSave: this.addedItems,
      referencesToDelete: this.deleteItems,
    });
  }
  addItemToArray(item: Reference): void {
    this.referencesFormArray.push(this.createItemGroup(item));
  }
  get referencesFormArray(): FormArray {
    return this.form.get('references') as FormArray;
  }
  createItemGroup(item: Reference): FormGroup {
    // console.log(item.endDate+"^^^^^^^^^^^^^^^");
    return this.formBuilder.group({
      title: [item.referenced.name],
      // title: "[item.referenced.name]",
      date: [item.referenced.date],
      // date: [this.dateHelper.getFormatedDateStringFromQueue(item.historyItemIdDto.beginDate)],
    });
  }
  fillTable(items: Reference[]): void {
    items.forEach((item) => {
      this.addItemToArray(item);
    });
  }
  validateNewReferencedPublication(publForCheck: Publication): boolean {
    if (this.references.length < 1) return true;
    let result = true;
    this.references.forEach((element) => {
      if (element.referenced.id === publForCheck.id) {
        result = false;
      }
    });
    return result;
  }
}

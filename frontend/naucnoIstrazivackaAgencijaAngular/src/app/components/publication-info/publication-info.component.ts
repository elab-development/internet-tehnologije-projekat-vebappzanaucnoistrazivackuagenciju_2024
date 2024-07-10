import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Publication } from '../../domain/publication.domain';
import { DateHelperService } from '../../service/date-helper.service';

@Component({
  selector: 'app-publication-info',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  template:`
  <h3>Basic info:</h3>
  <form [formGroup]="publicationForm">
    <label for="firstname">Name: </label>
    <input
      type="text"
      name="name"
      id="name"
      formControlName="name"
      (blur)="notifyChange()"
    />
    <br />
    <label for="publicationText">Publication Text</label>
    <br/>
      <textarea id="publicationText" name="publicationText" formControlName="publicationText" (blur)="notifyChange()"></textarea>
    <br />
    <label for="date">Date: </label>
    <input
      type="text"
      placeholder="DD.MM.YYYY"
      (blur)="onDateBlur()"
      (blur)="notifyChange()"
      (focus)="onDateFocus()"
      name="date"
      id="date"
      formControlName="date"
  />
    <br />
  </form>
  <!-- <button [disabled]="!publicationForm.valid" (click)="savePublication()">Save</button> -->
  `,
  styleUrl: './publication-info.component.scss'
})
export class PublicationInfoComponent implements OnChanges {
  constructor(private formBuilder: FormBuilder,private dateHelper:DateHelperService) {}

  ngOnChanges(changes: SimpleChanges): void {

  }

  notifyChange():void{
    this.savePublication();// samo radi emitovanje publikacije nadkomponenti
  }

  @Input() set publication({
    name,
    text,
    date
  }: Publication) {
    console.log("");
    console.log(date);

    let dateString = this.dateHelper.formatDateToString(new Date(date));
    console.log(dateString);
    this.publicationForm.patchValue({
      name: name,
      publicationText: text,
      date:dateString
    });
  }

  @Output() publicationEmitter = new EventEmitter<Publication>();

  publicationForm: FormGroup = this.formBuilder.group({
    name: this.formBuilder.control('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    publicationText: this.formBuilder.control('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    date: this.formBuilder.control('', {
      nonNullable: true,
      validators: [Validators.required],
    })
  });

  savePublication(): void {
    let name = (
      this.publicationForm.get('name')?.getRawValue() as string
    ).trim();
    let publicationText = (
      this.publicationForm.get('publicationText')?.getRawValue() as string
    ).trim();

    const dateInputElement = document.getElementById(
      'date'
    ) as HTMLInputElement;
    const formattedDate = dateInputElement.value;
    const parts = formattedDate.split('.');
    const year = parseInt(parts[2]);
    const month = parseInt(parts[1]);
    const day = parseInt(parts[0]);
    const convertedDate = new Date(year, month - 1, day);

    let date = convertedDate;
    
    let publication: Publication = {
      name: name,
      text: publicationText,
      date: convertedDate
    };
    console.log("aloooo=======================");
    console.log(publication);
    this.publicationEmitter.emit(publication);
  }

  onDateBlur() {
    const dateInputElement = document.getElementById(
      'date'
    ) as HTMLInputElement;
    const selectedDate = new Date(dateInputElement?.value);
    if (!this.publicationForm.get('date')!.value) {
      this.publicationForm.get('date')!.setValue(null);
    }
    if (dateInputElement) {
      dateInputElement.type = 'text';
    }

    dateInputElement.value = this.dateHelper.formatDateToString(selectedDate);
  }

  onDateFocus() {
    const dateInputElement = document.getElementById(
      'date'
    ) as HTMLInputElement;
    const formattedDate = dateInputElement.value;

    const convertedDate = this.dateHelper.formatedStringToDate(formattedDate);
    if (dateInputElement) {
      dateInputElement.type = 'date';
    }
    dateInputElement.valueAsDate = convertedDate;
  }
}
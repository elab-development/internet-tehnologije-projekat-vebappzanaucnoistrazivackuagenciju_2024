import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { City } from '../../domain/city.domain';
import { Researcher } from '../../domain/researcher.domain';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DateHelperService } from '../../service/date-helper.service';
import { validCmbSelection, validCmbSelectionInitial } from '../../myValidators/myCustomValidatorFunctions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-researcher-info',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './researcher-info.component.html',
  styleUrl: './researcher-info.component.scss'
})
export class ResearcherInfoComponent implements OnInit,OnChanges{
  @Input() cities: City[] = [];

  @Input() set researcher({
    firstname,
    lastname,
    birthday,
    city
  }: Researcher) {
    console.log("--------------");
    console.log(birthday);
    // let bs = birthday as string;
    // let queue = birthday.split;
    // console.log(queue);
    // let dateOfBirth:Date = new Date(Date.UTC(queue[0],queue[1]-1,queue[2])); 
    let birthdayString = this.dateHelper.formatDateToString(new Date(birthday));
    console.log(birthdayString);
    this.researcherForm.patchValue({
      firstname: firstname,
      lastname: lastname,
      city:city.name,
      // birthday:birthday.toLocaleDateString('de-DE', { year: 'numeric', month: '2-digit', day: '2-digit' })
      birthday:birthdayString
      // birthday:dateOfBirth.toLocaleDateString('de-DE', { year: 'numeric', month: '2-digit', day: '2-digit' })
    });
  }

  @Output() researcherEmitter = new EventEmitter<Researcher>();
  constructor(private formBuilder: FormBuilder,private dateHelper:DateHelperService) {}
  ngOnChanges(changes: SimpleChanges): void {
    // console.log("changed"+this.researcher);
  }

  researcherForm: FormGroup = this.formBuilder.group({
    firstname: this.formBuilder.control('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    lastname: this.formBuilder.control('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    birthday: this.formBuilder.control('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    city: this.formBuilder.control('-- Select --', {
      nonNullable: true,
      validators: [Validators.required, validCmbSelection(),validCmbSelectionInitial()],
    }),
  });

  ngOnInit(): void {
    // console.log("aloooooooo"+this.researcher);
  }


  saveResearcher(): void {
    let firstname = (
      this.researcherForm.get('firstname')?.getRawValue() as string
    ).trim();
    let lastname = (
      this.researcherForm.get('lastname')?.getRawValue() as string
    ).trim();

    const birthdayInputElement = document.getElementById(
      'birthday'
    ) as HTMLInputElement;
    const formattedDate = birthdayInputElement.value;
    const parts = formattedDate.split('.');
    const year = parseInt(parts[2]);
    const month = parseInt(parts[1]);
    const day = parseInt(parts[0]);
    const convertedDate = new Date(year, month - 1, day);
    // const convertedDate = this.dateHelper.formatedStringToDate(formattedDate);

    let birthday = convertedDate;
    let cityN = this.findCity(
      (this.researcherForm.get('city')?.getRawValue() as string).trim()
    );
    let city: City =
      cityN == null ? { id: -1, name: '' } : cityN;
    
    let researcher: Researcher = {
      firstname: firstname,
      lastname: lastname,
      birthday: birthday,
      city: city
    };
    this.researcherEmitter.emit(researcher);
  }

  onBirthdayBlur() {
    const birthdayInputElement = document.getElementById(
      'birthday'
    ) as HTMLInputElement;
    const selectedDate = new Date(birthdayInputElement?.value);
    if (!this.researcherForm.get('birthday')!.value) {
      this.researcherForm.get('birthday')!.setValue(null);
    }
    if (birthdayInputElement) {
      birthdayInputElement.type = 'text';
    }
    // const formattedDate = selectedDate.toLocaleDateString('de-DE', {
    //   year: 'numeric',
    //   month: '2-digit',
    //   day: '2-digit',
    // });
    // birthdayInputElement.value = formattedDate;
    birthdayInputElement.value = this.dateHelper.formatDateToString(selectedDate);
  }

  onBirthdayFocus() {
    const birthdayInputElement = document.getElementById(
      'birthday'
    ) as HTMLInputElement;
    const formattedDate = birthdayInputElement.value;
    // const parts = formattedDate.split('.');
    // const year = parseInt(parts[2]);
    // const month = parseInt(parts[1]);
    // const day = parseInt(parts[0]);
    // const convertedDate = new Date(Date.UTC(year,month-1,day));
    const convertedDate = this.dateHelper.formatedStringToDate(formattedDate);
    if (birthdayInputElement) {
      birthdayInputElement.type = 'date';
    }
    birthdayInputElement.valueAsDate = convertedDate;
  }

  private findCity(name: string | null): City | null {
    if (name == null) return null;
    let city = this.cities.find((x) => x.name === name);
    return city || null;
  }
}

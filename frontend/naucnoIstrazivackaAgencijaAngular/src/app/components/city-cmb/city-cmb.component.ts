import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { City } from '../../domain/city.domain';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-city-cmb',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  template:`
  <form [formGroup]="cmb">
    <label for="cmb">City: </label>
      <select formControlName="selectedOption" id="cmb">
        <option *ngFor="let option of cities" [value]="option.name">
          {{ option.name }}
        </option>
      </select>
    </form>
  `,
  styleUrl: './city-cmb.component.scss'
})
export class CityCmbComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
  }

  @Input() cities: City[] = [];
  
  cmb = this.formBuilder.group({
    selectedOption: '-- Select --',
  });

  @Output() selected = this.cmb
    .get('selectedOption')!
    .valueChanges.pipe(switchMap((title) => of(this.findId(title))));

  private findId(name: string | null): number | undefined {
    if (name == null) return undefined;
    let city = this.cities.find((x) => x.name === name);
    return city!.id;
  }
}

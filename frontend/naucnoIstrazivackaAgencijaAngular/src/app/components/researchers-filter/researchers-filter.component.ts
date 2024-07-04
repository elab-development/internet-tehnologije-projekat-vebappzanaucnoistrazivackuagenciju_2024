import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CityCmbComponent } from '../city-cmb/city-cmb.component';
import { City } from '../../domain/city.domain';
import { ResearcherFilter } from '../../domain/researchersFilter';

@Component({
  selector: 'app-researchers-filter',
  standalone: true,
  imports: [CityCmbComponent],
  template: `
    <br />
    <app-city-cmb
      [cities]="cities"
      (selected)="notifyCity($event)"
    ></app-city-cmb>
  `,
  styleUrl: './researchers-filter.component.scss',
})
export class ResearchersFilterComponent {
  @Input() cities: City[] = [];
  @Output() filterChanged = new EventEmitter<ResearcherFilter>();
  researcherFilter: ResearcherFilter = { cityId: -1 };
  // researcherFilter: ResearcherFilter = { cityId: -1 };

  notifyCity($event: number | undefined) {
    if (!$event || $event == null) {
      this.researcherFilter.cityId = -1;
    } else {
      this.researcherFilter.cityId = $event;
    }
    this.filterChanged.emit(this.researcherFilter);
  }
}

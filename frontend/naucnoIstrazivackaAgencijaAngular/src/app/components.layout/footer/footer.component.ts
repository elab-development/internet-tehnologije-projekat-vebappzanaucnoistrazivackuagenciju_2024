import { Component, OnInit } from '@angular/core';
import { TimeApiService } from '../../service/time-api.service';
import { Observable } from 'rxjs';
import { CurrentTime } from '../../domain/timeApi';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [AsyncPipe, CommonModule],
  template: `<p>Milos Matic     ITEH 2024    Aleksa Krsmanovic</p>
   <!-- <p *ngIf="time$ | async as time">{{time.dateTime}}</p> -->
   `,
  styles: [
    `
      p {
        position: fixed;
        bottom: 0;
        color: gray;
        border-top: 1px solid gray;
        padding: 1rem;
        left: 50%;
        text-align: center;
        background-color: #f9f9f9;
        margin: 0;
      }
      p {
        left: 0;
        width: 100%;
        background-color: #f9f9f9; 
        margin: 0;
      }
    `,
  ],
})
export class FooterComponent implements OnInit {
  time$!: Observable<CurrentTime>;
  constructor(private timeService: TimeApiService){}
  ngOnInit(){
    this.time$=this.timeService.getTime();
   // this.time$.subscribe((x) => console.log(x.milliSeconds));
  }
}

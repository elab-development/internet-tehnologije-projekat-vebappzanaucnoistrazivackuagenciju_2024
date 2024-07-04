import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: '<p>Milos Matic     ITEH 2024    Aleksa Krsmanovic</p>',
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
export class FooterComponent {}

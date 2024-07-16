import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive],
  template: `
  <ul>
    <li><a routerLink="/home" routerLinkActive="active" >Home</a></li>
    <li><a routerLink="/home/researchers" routerLinkActive="active" >Researchers</a></li>
    <li><a routerLink="/home/publications" routerLinkActive="active" >Publications</a></li>
    <li><a routerLink="/home/reports" routerLinkActive="active" >Reports</a></li>
    <li><a routerLink="/home/account" routerLinkActive="active" >Account</a></li>
    <!-- <li><a routerLink="/home/logout" routerLinkActive="active" >Logout</a></li> -->
  </ul>
`,
  styles: [
    `
      ul {
        margin: 0;
        padding: 1rem;
        background-color: blue;
        list-style-type: none;
        display: flex;
        flex-direction: row;
        gap: 1rem;
      }

      a {
        color: white;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    `,
  ]
})
export class HeaderComponent {

}
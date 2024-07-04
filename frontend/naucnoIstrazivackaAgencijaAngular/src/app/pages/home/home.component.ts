import { Component } from '@angular/core';
import { FooterComponent } from '../../components.layout/footer/footer.component';
import { HeaderComponent } from '../../components.layout/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  // templateUrl: './home.component.html',
  template: `
    <app-header></app-header>
    <div class="body">
      <router-outlet></router-outlet>
    </div>
    <app-footer></app-footer>
  `,
  styleUrl: './home.component.scss'
//   styles: [
//     `
//       .body{
//     background-color: #34A853;
//  }
//     `,
//   ],
})
export class HomeComponent {}

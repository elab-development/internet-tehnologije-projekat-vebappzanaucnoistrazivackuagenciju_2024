import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ResearchersComponent } from './pages/researchers/researchers.component';
import { PublicationsComponent } from './pages/publications/publications.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { AccountComponent } from './pages/account/account.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AddResearcherComponent } from './components/add-researcher/add-researcher.component';
import { canActivateTokenGuard } from './guards/auth-guard.service';
import { EditResearcherComponent } from './components/edit-researcher/edit-researcher.component';

export const routes: Routes = [
    {
        path: 'home',
        component:HomeComponent,
        children:[
          {path:"researchers",title: 'Researchers',component:ResearchersComponent},
          {path:"researchers/add",title: 'AddResearcher',component:AddResearcherComponent,canActivate:[canActivateTokenGuard]},
        //   {path:"researchers/:id",title: 'Researcher',component:EditResearcherComponent,canActivate:[canActivateTokenGuard]},
          {path:"researchers/:id",title: 'Researcher',component:EditResearcherComponent},
          {path:"publications",title: 'Publications',component:PublicationsComponent},
          {path:"reports",title: 'Reports',component:ReportsComponent},
          {path:"account",title: 'Account',component:AccountComponent},
          {path:"logout",title: 'Logout',component:LogoutComponent},
          {path:"login",title: 'Login',component:LoginComponent},
          {path:"register",title: 'Register',component:RegisterComponent}
        ],
      },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

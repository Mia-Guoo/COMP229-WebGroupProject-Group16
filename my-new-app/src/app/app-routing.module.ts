import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncidentsListComponent } from './components/incidents-list/incidents-list.component';

import { AddIncidentComponent } from './components/add-incident/add-incident.component';
import { IncidentDetailComponent } from './components/incident-detail/incident-detail.component';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthGuard } from './shared/auth.guard';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent, data: {title: 'home'}},
  { path: 'incidents-list', component: IncidentsListComponent, data: {title: 'incident-list'}, },
  { path: 'add-incident', component: AddIncidentComponent, data: {title: 'add-incident'},canActivate: [AuthGuard], },
  { path: 'edit-incident/:id', component: IncidentDetailComponent, data: {title: 'edit-incident'},canActivate: [AuthGuard], },
  { path: 'log-in', component: SigninComponent },
  { path: 'sign-up', component: SignupComponent },
  {path: 'user-profile', component: UserProfileComponent,canActivate: [AuthGuard],},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

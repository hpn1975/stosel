import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileMainComponent } from './profile/profile-main/profile-main.component';
import { AppComponent } from './app.component';
import { HomeMainComponent } from './home/home-main/home-main.component';

const routes: Routes = [

  { path: 'profile', component: ProfileMainComponent },
  { path: 'home', component: HomeMainComponent },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: HomeMainComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfileLoginComponent} from './profile-login/profile-login.component'
import { ProfileMainComponent } from './profile-main/profile-main.component'
import { ProfileRegisterComponent } from './profile-register/profile-register.component'
import { AuthGuardService as AuthGuard } from '../services/auth-guard.service'
const routes: Routes = [
  {
    path: '',
    component: ProfileMainComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'register',
        component: ProfileRegisterComponent
      },
      {
        path: 'login',
        component: ProfileLoginComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }

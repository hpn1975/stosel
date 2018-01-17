import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileMainComponent } from './profile-main/profile-main.component';
import { ProfileRegisterComponent } from './profile-register/profile-register.component';
import { ProfileLoginComponent } from './profile-login/profile-login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProfileRoutingModule
  ],
  declarations: [ProfileMainComponent, ProfileRegisterComponent, ProfileLoginComponent],
  exports:[ProfileMainComponent]
})
export class ProfileModule { }

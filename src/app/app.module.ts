//Import all core Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//Import all app Modules
import { AppRoutingModule } from './app-routing.module';
//import { ProfileModule } from './profile/profile.module';
//import { HomeModule } from './home/home.module';
//Import components.
import { AppComponent } from './app.component';
//Import Services.
import { FetchDataService } from './services/fetch-data.service';
import {AuthGuardService} from './services/auth-guard.service'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    RouterModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule
  //  NgbModule.forRoot()
  ],
  providers: [FetchDataService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }

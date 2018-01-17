import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeRoutingModule } from './home-routing.module';
import { HomeMainComponent } from './home-main/home-main.component';
import { FetchDataService } from '../services/fetch-data.service';
//import { ProfileModule} from '../profile/profile.module';
import { HomeLandingComponent } from './home-landing/home-landing.component'
@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    ],  
  declarations: [HomeMainComponent, HomeLandingComponent]
  

})
export class HomeModule { }

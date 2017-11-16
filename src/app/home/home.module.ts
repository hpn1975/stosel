import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeRoutingModule } from './home-routing.module';
import { HomeMainComponent } from './home-main/home-main.component';
import { FetchDataService } from '../services/fetch-data.service';
import { ProfileModule} from '../profile/profile.module'
@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    ProfileModule
  ],  
  declarations: [HomeMainComponent]
  

})
export class HomeModule { }

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FetchDataService } from '../../services/fetch-data.service';

@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeMainComponent implements OnInit {

  constructor(private fetchData: FetchDataService) { }

  //Current Date
  CurrDate = Date.now();


  objects: any[] = [];
  isDataLoaded: boolean = false;

  ngOnInit() {
    this.isDataLoaded = false;

    this.fetchData.getData('/api/profile')
      .subscribe(myobj => {
        console.log("here ");
        console.log(myobj)
        this.objects.push(myobj);
        this.isDataLoaded = true;
      },
      err => { console.log(err) });

  }

}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-profile-main',
  templateUrl: './profile-main.component.html',
  styleUrls: ['./profile-main.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileMainComponent implements OnInit {

  userLoggedIn: boolean = true;

  constructor() {}

  ngOnInit() {}
  
}

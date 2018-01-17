import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(private router: Router) { }

  canActivate() {
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      console.log("returning true")
      return true;
    }

    // not logged in so redirect to login page
    //this.router.navigate(['/profile/login']);
    console.log("returning false")
    return true;
  }

  canActivateChild() {
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      console.log("returning true")
      return true;
    }

    // not logged in so redirect to login page
    //this.router.navigate(['/profile/login']);
    console.log("returning false")
    return true;
  }
}

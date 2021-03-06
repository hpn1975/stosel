import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { LoginService } from './login.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private us: LoginService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.us.isAuth()) {
      localStorage.setItem('error', 'You need to be logged in to access this page');
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
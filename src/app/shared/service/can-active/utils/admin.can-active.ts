import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {UserDetailsService} from '../../user-details-service';
import {Observable} from 'rxjs/Observable';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isNullOrUndefined} from 'util';
import {isPlatformBrowser} from '@angular/common';

@Injectable()
export class AdminCanActive {
  constructor(private _router: Router, private _userDetailsService: UserDetailsService, @Inject(PLATFORM_ID) private platformId: Object) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (isPlatformBrowser(this.platformId)) {
      if (!isNullOrUndefined(localStorage.getItem('ROLE'))) {
        if (localStorage.getItem('ROLE') == 'MODERATOR')
          return true;
        else {
          this._router.navigateByUrl('/');
          return false;
        }
      } else {
        if (!isNullOrUndefined(sessionStorage.getItem('ROLE'))) {
          if (sessionStorage.getItem('ROLE') == 'MODERATOR')
            return true;
          else {
            this._router.navigateByUrl('/');
            return false;
          }
        }
      }
    }
    return false;
  }
}

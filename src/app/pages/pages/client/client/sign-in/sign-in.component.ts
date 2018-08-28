import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {User} from '../../../../../shared/models/user';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../../../shared/service/user.service';
import {LoginService} from '../../../../../shared/service/login.service';
import {UserDetailsService} from '../../../../../shared/service/user-details-service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Config} from '../../../../../shared/config/config';
import {isNullOrUndefined} from 'util';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [UserService, LoginService]
})
export class SignInComponent implements OnInit, AfterViewInit {
  user: User = new User();
  userForm: FormGroup;
  @ViewChild('check') check: ElementRef;

  private _canAuth = new Subject<boolean>();
  private canAuth$ = this._canAuth.asObservable();
  badPass: boolean = false;

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private _userService: UserService, private _loginService: LoginService, private _userDetailsService: UserDetailsService) {
    localStorage.clear();
    sessionStorage.clear();
    this._userDetailsService.logout();
    this.withParams();
  }

  auth() {
    // alert('Логінування на даний момент не можливе\nВедуться технічні роботи');
    this._loginService.sendCredentials(this.user).subscribe(next => {
      if (this.check.nativeElement.checked == true) {
        this._userDetailsService.tokenParseInLocalStorage(next);
        this._userService.get().subscribe(next => {
          this._userDetailsService.loginWithLocal(next);
          this._router.navigateByUrl('/');
        });
      } else if (this.check.nativeElement.checked == false) {
        this._userDetailsService.tokenParseInSessionStorage(next);
        this._userService.get().subscribe(next => {
          this._userDetailsService.loginWithSession(next);
          this._router.navigateByUrl('/');
        });
      }
    }, error => {
      console.error(error);
      this.badPass = true;
    });
  }

  checkValidity() {
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/gi)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    });
    this.userForm.valueChanges.subscribe(next => {
      this.user = next;
    });
  }

  withParams() {
    this._activatedRoute.params.subscribe(param => {
      if ((!isNullOrUndefined(param['username'])) && (!isNullOrUndefined(param['password']))) {
        this.canAuth$.subscribe(next => {
          this.user.email = param['username'];
          this.user.password = param['password'];
          this.auth();
        });
      } else {

      }
    });
  }

  ngOnInit() {

    this.checkValidity();
  }

  ngAfterViewInit(): void {

    this._canAuth.next(true);
  }

}

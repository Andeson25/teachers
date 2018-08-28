import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../../../../shared/service/user.service';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.css'],
  providers: [UserService]
})
export class ChangeComponent implements OnInit {

  uuid: string = '';

  constructor(private _route: ActivatedRoute, private _userService: UserService, private _router: Router) {
    this._route.params.subscribe(next => {
      this.uuid = next['uuid'];
    });
  }

  sendPassword(password_one: string, password_two: string) {
    if (password_one == password_two) {
      this._userService.sendPassword(password_one, this.uuid).subscribe(next => {
          console.log(next);
        }, error => {
          console.error(error);
        },()=>{
        this._router.navigateByUrl("/sign-in");
        }
      );
    } else {
      alert('Паролі не співпадають');
    }

  }

  ngOnInit() {
  }

}

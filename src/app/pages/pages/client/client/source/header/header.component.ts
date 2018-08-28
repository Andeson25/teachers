import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserDetailsService} from '../../../../../../shared/service/user-details-service';
import {User} from '../../../../../../shared/models/user';
import {isNullOrUndefined} from "util";
import {StompService} from '../../../../../../shared/service/stomp.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuth: boolean =false ;
  user: User = new User();
  messages: number = 0;

  constructor(private _userDetailsService: UserDetailsService, private _stomp:StompService) {
      this.isAuth=_userDetailsService.isAuth;
    _userDetailsService.checkAuthStorage().subscribe(next=>{
      this.isAuth=next;
    });
     this.user = _userDetailsService.user;
    _userDetailsService.getUser().subscribe(next => {
      this.user = next;
    });
    this._stomp.unReadMessages$.subscribe(next=>{
        this.messages=next;
    },error => {
        console.log(error);
    })
  }



  logout() {
    this._userDetailsService.logout();
  }

  ngOnInit() {

  }

}

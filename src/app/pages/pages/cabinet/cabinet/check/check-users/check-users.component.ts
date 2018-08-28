import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../../../../shared/service/user.service';
import {User} from '../../../../../../shared/models/user';

@Component({
  selector: 'app-check-users',
  templateUrl: './check-users.component.html',
  styleUrls: ['./check-users.component.css'],
  providers: [UserService]
})
export class CheckUsersComponent implements OnInit {
  users: User [] = [];
  constructor(private _user:UserService) {
    this._user.findAllNotPerevireno().subscribe(next=>{
        this.users=next;
    })
  }

  update(){
   this. _user.findAllNotPerevireno().subscribe(next=>{
      this.users=next;
    })
  }

  ngOnInit() {
  }

}

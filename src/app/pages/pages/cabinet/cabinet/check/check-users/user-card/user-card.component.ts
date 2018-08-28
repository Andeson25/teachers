import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {User} from '../../../../../../../shared/models/user';
import {UserService} from '../../../../../../../shared/service/user.service';
import {Specialization} from '../../../../../../../shared/models/specialization';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
  providers:[UserService]
})
export class UserCardComponent implements OnInit {
  @Input("user") user: User;
  @Output() update: EventEmitter<any> = new EventEmitter<any>();
  constructor(private _user :UserService) {

  }

  addSpec(){
    this.user.specializations.push(new Specialization(''))
  }
  send(inp:HTMLInputElement){
    if(inp.checked){
      this.user.role='MODERATOR';
    }else
      if(!inp.checked){
        this.user.role='USER';
      }
    this._user.pereviryty(this.user).subscribe(next=>{
      console.log(this.user);
      this.update.emit();
    },error => {
        console.log(error);
    })
  }
  deleteSpec(index: number){
    this.user.specializations.splice(index,1);
  }

  ngOnInit() {
  }

}

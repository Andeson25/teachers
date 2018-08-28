import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../../../../shared/service/user.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-restore-password-container',
  templateUrl: './restore-password-container.component.html',
  styleUrls: ['./restore-password-container.component.css'],
  providers: [UserService]
})
export class RestorePasswordContainerComponent implements OnInit {
  constructor(private _userService: UserService, private route: Router) { }



  sendEmail(email:string){
    this._userService.sendEmail(email).subscribe(next=>{
      console.log(next);
    },error=>{
      console.log(error);
    },()=>{
      alert("На вашу електронну адресу  було відправлено підтвердження");
      this.route.navigateByUrl('/sign-in');
    })
  }


  ngOnInit() {
  }

}

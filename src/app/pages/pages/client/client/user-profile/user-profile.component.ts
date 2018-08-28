import {Component, OnInit} from '@angular/core';
import {User} from '../../../../../shared/models/user';
import {UserService} from '../../../../../shared/service/user.service';
import {ActivatedRoute} from '@angular/router';
import {File} from '../../../../../shared/models/file';
import {ImagePipe} from '../../../../../shared/pipe/utils/image.pipe';
import {UserDetailsService} from '../../../../../shared/service/user-details-service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [UserService, ImagePipe]
})
export class UserProfileComponent implements OnInit {

  user: User = new User();
  bigImageSrc: string = '';
  bool: boolean = false;
  incumbency: any;

  constructor(private _userService: UserService, private activateRoute: ActivatedRoute, private  imagePipe: ImagePipe, _user: UserDetailsService) {
    this.activateRoute.params.subscribe(next => {
      this.bool=false;
      this._userService.findOneAvailable(next['id']).subscribe(next => {
        this.user = next;
        console.log(next);
        this.bool=true;
      });
    });
    this.incumbency=_user.incumbency;
  }

  showFullSizeImg(image: string) {
    this.bigImageSrc = this.imagePipe.transform(image);
  }

  ngOnInit() {

  }

}

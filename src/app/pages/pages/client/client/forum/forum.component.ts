import {Component, OnInit} from '@angular/core';
import {ForumSectionContainer} from "../../../../../shared/models/forum-section-container";
import {User} from '../../../../../shared/models/user';
import {UserDetailsService} from '../../../../../shared/service/user-details-service';


@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  isAuth: boolean = false;
  user: User = new User();
  forumSectionContainer: ForumSectionContainer = new ForumSectionContainer();

  constructor(private _userDetailsService: UserDetailsService) {
    this.isAuth = _userDetailsService.isAuth;
    this.user = _userDetailsService.user;
    _userDetailsService.checkAuthStorage().subscribe(next => {
      this.isAuth = next;
    });
    _userDetailsService.getUser().subscribe(next => {
      this.user = next;
    });
  }

  ngOnInit() {

  }

}

import { Component, OnInit } from '@angular/core';
import {UserDetailsService} from '../../../../../../shared/service/user-details-service';
import {ForumSectionContainerService} from '../../../../../../shared/service/forum-section-container.service';
import {ForumSectionContainer} from '../../../../../../shared/models/forum-section-container';

@Component({
  selector: 'app-forum-wrapper',
  templateUrl: './forum-wrapper.component.html',
  styleUrls: ['./forum-wrapper.component.css'],
  providers: [ForumSectionContainerService]
})
export class ForumWrapperComponent implements OnInit {
  forumSectionContainers: ForumSectionContainer[] = [];
  constructor(private _userDetailsService: UserDetailsService ,private _forumSectionContainerService: ForumSectionContainerService) {
    this._forumSectionContainerService.findAll().subscribe(next => {
      this.forumSectionContainers = next;
      console.log(next);
    }, error => {
      console.log(error);
    });
  }

  delete(cont: ForumSectionContainer){
    this._forumSectionContainerService.delete(cont.id).subscribe(next=>{
        this.forumSectionContainers.splice(this.forumSectionContainers.indexOf(cont),1);
    })
  }

  ngOnInit() {
  }

}

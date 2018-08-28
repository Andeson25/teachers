import {Component, OnInit} from '@angular/core';
import {ForumSectionService} from '../../../../../../../shared/service/forum-section.service';
import {ActivatedRoute} from '@angular/router';
import {ForumSection} from '../../../../../../../shared/models/forum-section';
import {ForumMessage} from '../../../../../../../shared/models/forum-message';
import {User} from '../../../../../../../shared/models/user';
import {isNullOrUndefined} from 'util';
import {ForumTopicService} from '../../../../../../../shared/service/forum-topic.service';
import {ForumTopic} from '../../../../../../../shared/models/forum-topic';
import {UserDetailsService} from '../../../../../../../shared/service/user-details-service';

@Component({
  selector: 'app-forum-section',
  templateUrl: './forum-section.component.html',
  styleUrls: ['./forum-section.component.css'],
  providers: [ForumSectionService,ForumTopicService]
})
export class ForumSectionComponent implements OnInit {
  forumSection: ForumSection = new ForumSection();
  forumTopics: ForumTopic[] = [];

  currentPage: number = 1;

  bool = true;

  backBool: boolean;

  id;

  user:User= new User();

  constructor(private  _forumSectionService: ForumSectionService, private _activateRoute: ActivatedRoute, private _forumTopic: ForumTopicService, private _user: UserDetailsService) {
    this.user=this._user.user;
    this._user.getUser().subscribe(next=>{
      this.user=next;
    })
    this._activateRoute.params.subscribe(next => {
      this.id=next['id'];
      this._forumSectionService.findOne(next['id']).subscribe(next => {
        this.forumSection = next;
      });
    });
    this._forumTopic.findAllPageableAvailable( this.id,0, 10).subscribe(next => {
      if (next.length < 10) {
        this.bool = false;
      } else
        this.bool = true;
      if (next.length != 0) {
        this.forumTopics = next;
      }
      this.backBool = this.currentPage == 1;
    }, error => {
      console.log(error);
    });
  }

  loadPage(zsuv: number) {

    if (this.currentPage + zsuv >= 1) {
      this._forumTopic.findAllPageableAvailable(this.id,this.currentPage - 1 + zsuv, 10).subscribe(next => {
        this.bool = next.length >= 10;
        if (next.length != 0 || this.currentPage + zsuv == 1) {
          this.forumTopics = next;
          this.currentPage += zsuv;
          this.backBool = this.currentPage == 1;
        }
      });
    }

  }

  deleteTopic(top:ForumTopic){
    top.available=false;
    this._forumTopic.delete(top.id).subscribe(next=>{
      this.loadPage(this.forumTopics.length == 1 ? this.currentPage == 1 ? 0 : -1 : 0);
    }, error => {
      console.log(error);
    });
  }

  prePage() {
    this.loadPage(-1);
  }

  nextPage() {
    this.loadPage(1);
  }

  getArrayFrom(message: ForumMessage[]): User {

    if (!isNullOrUndefined(message)) {
      if (message.length > 0) {
        if (!isNullOrUndefined(message[0].from))
          return message[0].from;
      }
    }
    return new User();
  }

  getMaxMessage(forumTopic: ForumTopic): ForumMessage {
    if (!isNullOrUndefined(forumTopic) || forumTopic.messages.length != 0) {
      return forumTopic.messages.reduce((prev, current, index, arr) => {
        if (index == 0) {
          return current;
        } else {
      return (new Date(prev.datetime)> new Date(current.datetime))? prev : current;
        }
      }, null);
    }else{
      return new ForumMessage()
    }
  }

  getArrayMessage(message: ForumMessage[]): ForumMessage {
    if (!isNullOrUndefined(message)) {
      if (message.length > 0) {
        return message[0];
      }
    }
    return new ForumMessage();
  }

  get(from: string): string {
    if (!isNullOrUndefined(from))
      return from;
    return '';
  }

  getUser(user: User) {
    if (!isNullOrUndefined(user)) {
      return user;
    }
    return new User();
  }
  isNullOrUndefined(obj){
    return isNullOrUndefined(obj);
  }
  ngOnInit() {
  }

}

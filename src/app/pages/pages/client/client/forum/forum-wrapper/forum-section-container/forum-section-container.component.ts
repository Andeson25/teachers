import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';
import {ForumSectionContainer} from '../../../../../../../shared/models/forum-section-container';
import {ForumTopic} from '../../../../../../../shared/models/forum-topic';
import {isNullOrUndefined} from 'util';
import {ForumSection} from '../../../../../../../shared/models/forum-section';
import {ForumMessage} from '../../../../../../../shared/models/forum-message';
import {User} from '../../../../../../../shared/models/user';
import {UserDetailsService} from '../../../../../../../shared/service/user-details-service';
import {ForumSectionService} from '../../../../../../../shared/service/forum-section.service';

@Component({
  selector: 'app-forum-section-container',
  templateUrl: './forum-section-container.component.html',
  styleUrls: ['./forum-section-container.component.css'],
  providers: [ForumSectionService]
})
export class ForumSectionContainerComponent implements AfterViewInit {
  @Input() forumSectionContainer: ForumSectionContainer;
  @Output() forumContainerDelete: EventEmitter<ForumSectionContainer> = new EventEmitter<ForumSectionContainer>();
  newestForumTopic: ForumTopic = new ForumTopic();

  newestForumMessage: ForumMessage = new ForumMessage();
  user: User = new User();


  constructor(private _user: UserDetailsService, private forumSection: ForumSectionService) {
    this.user = _user.user;
    _user.getUser().subscribe(next => {
      this.user = next;
    });
  }


  delete(s: ForumSection) {
    this.forumSection.delete(s.id).subscribe(next=>{
        this.forumSectionContainer.sections.splice( this.forumSectionContainer.sections.indexOf(s),1);
    })
  }

  deleteContainer(){
    this.forumContainerDelete.emit(this.forumSectionContainer);
  }

  findMax(forumSection: ForumSection): ForumMessage {
    if (!isNullOrUndefined(forumSection.forumTopics) || forumSection.forumTopics.length != 0) {
      return this.getMaxMessage(forumSection.forumTopics.reduce((prev, current, index) => {
          if(current.messages.length==0&&index<current.messages.length-1){
            return current;
          }else if(current.messages.length==0){
            return prev
          }
          if (index == 0) {
            this.newestForumMessage = this.getMaxMessage(current);
            this.newestForumTopic = current;
            return current;
          } else {
            let one = this.getMaxMessage(current);
            if(this.newestForumMessage > one){
              return prev;
            }
            this.newestForumMessage = one;
            this.newestForumTopic=current;
            return current;
          }
        }, null
      ))
    }else{
      return new ForumMessage();
    }

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

  countAllMessages(forumSection: ForumSection): number {
    if (!isNullOrUndefined(forumSection.forumTopics) || forumSection.forumTopics.length != 0) {
      let numb = 0;
      forumSection.forumTopics.forEach(topic => {
        if (topic.messages.length != 0 && !isNullOrUndefined(topic.messages))
          numb += topic.messages.length;
      });
      return numb;
    }
    return 0;
  }
  isNullOrUndefined(obj){
    return isNullOrUndefined(obj);

  }

  ngAfterViewInit(): void {

  }
}

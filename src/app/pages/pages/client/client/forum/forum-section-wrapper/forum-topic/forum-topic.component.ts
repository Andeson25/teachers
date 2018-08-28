import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ForumTopicService} from '../../../../../../../shared/service/forum-topic.service';
import {ForumTopic} from '../../../../../../../shared/models/forum-topic';
import {User} from '../../../../../../../shared/models/user';
import {isNullOrUndefined} from 'util';
import {Specialization} from '../../../../../../../shared/models/specialization';
import {PlaceOfWork} from '../../../../../../../shared/models/place-of-work';
import {ForumMessageService} from '../../../../../../../shared/service/forum-message.service';
import {ForumMessage} from '../../../../../../../shared/models/forum-message';
import {UserDetailsService} from '../../../../../../../shared/service/user-details-service';

@Component({
  selector: 'app-forum-topic',
  templateUrl: './forum-topic.component.html',
  styleUrls: ['./forum-topic.component.css'],
  providers: [ForumTopicService, ForumMessageService]
})
export class ForumTopicComponent implements OnInit {
  incumbency = {
    'DIRECTOR':'Директор',
    'TEACHER':'Вчитель',
    'COUCH_MENTOR':'Коуч',
    'HEAD_TEACHER':'Завуч',
    'OTHER':'Інша'
  };
  bool:boolean=false;
  forumTopic: ForumTopic = new ForumTopic();
  forumMessages: ForumMessage[] = [];
  id:number;
  // user: User = new User();

  currentPage: number = 1;

  boolPage = true;

  backBool: boolean;

  user: User= new User();

  constructor(private _activateRoute: ActivatedRoute, private _forumTopicService: ForumTopicService, private _forumMessageService: ForumMessageService, private _user: UserDetailsService) {
    this.user=this._user.user;
    this._user.getUser().subscribe(next=>{
        this.user=next;
    });
    this._activateRoute.params.subscribe(next => {
      this.id=next['id'];
      this._forumTopicService.findOne(next['id']).subscribe(next => {
        if (isNullOrUndefined(next)) {
          this.forumTopic = new ForumTopic();
        } else {
          this.forumTopic = next;
          this.checkUser();
          console.log(next);
          this.bool=true;
        }
      }, error => {
        console.log(error);
      });
      this._forumMessageService.findAllAvailablePageableByTopic(0, 10, this.id).subscribe(next => {
        this.boolPage = next.length >= 10;
        if (next.length != 0 || this.currentPage  == 1) {
          this.forumMessages = next;
          this.backBool = this.currentPage == 1;
        }
      }, error => {
        console.log(error);
      });
      this.backBool = this.currentPage == 1;
    });

  }


  checkUser(){
    if(isNullOrUndefined(this.forumTopic.author)){
      this.forumTopic.author = new User();
      this.forumTopic.author.name='Корустувача було';
      this.forumTopic.author.lastname='видалено';
      this.forumTopic.author.incumbency='none';
    }
  }

  loadPage(zsuv: number) {
    if (this.currentPage - 1 + zsuv >= 0) {
      this._forumMessageService.findAllAvailablePageableByTopic(this.currentPage - 1 + zsuv, 10, this.id,).subscribe(next => {
        this.boolPage = next.length >= 10;
        if (next.length != 0 || this.currentPage + zsuv == 1) {
          this.forumMessages = next;
          this.currentPage += zsuv;
          this.backBool = this.currentPage == 1;
        }
      },error => {
          console.log(error);
      });
    }
  }
  deleteMessage(one: ForumMessage){
    this._forumMessageService.delete(one.id).subscribe(next=>{
      this.loadPage(this.forumMessages.length == 1 ? this.currentPage == 1 ? 0 : -1 : 0);
    },error => {
      console.log(error);
    })
  }
  prePage() {
    this.loadPage(-1);
  }

  nextPage() {
    this.loadPage(1);
  }

  getPlaceOfWork(obj: PlaceOfWork): PlaceOfWork {
    if (isNullOrUndefined(obj)) {
      return obj;
    }
    return new PlaceOfWork();
  }

  getArr(any: any[]) {
    if (!isNullOrUndefined(any)) {
      return any;
    }
    return [];
  }

  getSpecializations(specializations: Specialization[]): Specialization {
    if (!isNullOrUndefined(specializations)) {
      if (specializations.length > 0)
        return specializations[0];
    }
    return new Specialization();
  }



  getForumTopic(forumTopic: ForumTopic): ForumTopic {
    if (!isNullOrUndefined(forumTopic)) {
      return forumTopic;
    }
    return new ForumTopic();
  }

  getAuthor(author: User): User {
    if (!isNullOrUndefined(author)) {
      return author;
    }
    return new User();
  }

  get(obj) {
    if (!isNullOrUndefined(obj)) {
      return obj;
    }
    return '';
  }


  send(form: HTMLTextAreaElement) {
    let one = new ForumMessage();
    one.text = form.value;
    one.forumTopic = this.forumTopic;
    this._forumMessageService.saveId(one).subscribe(next => {
      console.log(JSON.stringify(next));
      form.value = '';
      if (isNullOrUndefined(this.forumTopic.messages)) {
        this.forumTopic.messages = [];
      }
      this.forumMessages.unshift(next);

    }, error => {
      alert('помилка при надсиланні:[' + error.status + ']');
      console.error(error);
    });
  }

  ngOnInit() {
  }

}

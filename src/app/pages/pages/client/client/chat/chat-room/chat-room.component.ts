import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {StompService} from '../../../../../../shared/service/stomp.service';
import {ChatMessage} from '../../../../../../shared/models/chat-message';
import {ActivatedRoute, Router} from '@angular/router';
import {ChatRoomService} from '../../../../../../shared/service/chat-room.service';
import {ChatRoom} from '../../../../../../shared/models/chat-room';
import {UserDetailsService} from '../../../../../../shared/service/user-details-service';
import {User} from '../../../../../../shared/models/user';
import {isNullOrUndefined} from 'util';
import {File} from '../../../../../../shared/models/file';
import {FileService} from '../../../../../../shared/service/file.service';
import {FunctionCall} from '@angular/compiler';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css'],
  providers: [ChatRoomService, FileService]
})
export class ChatRoomComponent implements OnInit {
  id: number;
  image = '../../../../../../../assets/svg/multiple-users-silhouette.svg';
  messages: ChatMessage[] = [];
  user: User = new User();
  otherUser: User = new User();
  files: File[] = [];
  param:boolean=false;
  currentPage:number=1;
  text: string ='';
  openPopup: Function ;

  setPopupAction(fn: any) {
    this.openPopup = fn;
  }

  @ViewChild('load') loadIcon: ElementRef;

  constructor(private _filesService: FileService, private route: Router, private _stompService: StompService, private _route: ActivatedRoute, private _chatRoom: ChatRoomService, private _userDetails: UserDetailsService) {


    this.user = _userDetails.user;
    this._userDetails.getUser().subscribe(next => {
      this.user = next;
    });
    _route.params.subscribe(next => {
      this.param=!isNullOrUndefined(next['id']);
      if (!isNullOrUndefined(next['id'])) {
        this.id = parseInt(next['id']);
        this._chatRoom.findOneWithMessagesPageable(this.id,50*this.currentPage).subscribe(room => {
          let countUnread:number=0;
            room.chatRoom.users.forEach(next => {
              if (next.user.id != this.user.id) {
                this.otherUser = next.user;
              }
            });
          this._stompService.minusRead(room.chatRoom, room.count);
          this.messages=room.chatRoom.messages;
          this.messages.sort((a, b) => {
            return new Date(a.datetime) < new Date(b.datetime) ? -1 : new Date(a.datetime) > new Date(b.datetime) ? 1 : 0;
          });
            this._stompService.chatMessages$.subscribe(next => {
              if (next.has(this.id)) {
                this.messages = next.get(this.id);
                this.messages.sort((a, b) => {
                  return new Date(a.datetime) < new Date(b.datetime) ? -1 : new Date(a.datetime) > new Date(b.datetime) ? 1 : 0;
                });
              }
            });
        }, error => {
          console.log(error);
        });
      }
    });
  }
  loadFile( form: HTMLFormElement, input: HTMLInputElement){
    if ((input.files[0].size / 1000000) <= 5 && this.files.length < 1) {
      this._filesService.save(form).subscribe(next => {
        console.log(next);
        this.files.push(next);
      }, error => {
        console.log(error);
      });
      form.reset();
    } else {
      if (input.files[0].size / 1000000 >= 5) {
        alert('Файл занадто великий');
      }
      if (this.files.length >= 1) {
        alert('Ви не можете відправити більше одного файла одним повідомленням');
      }
    }
  }

  delete(file: File, i : number){
    this._filesService.delete(file.id).subscribe(next=>{
      console.log(next);
      this.files=[];
    },error => {
      console.log(error);
    })
  }

  send(text: string) {
    try {
      if (!/^\s+$/.test(this.text)) {
        if (this.text.length != 0) {
      let message = new ChatMessage();
      message.text = this.text;
          message.files = this.files;
      this._stompService.sendMessage(message, this.id);
        }
      }
      if (this.text.length == 0 && this.files.length == 1) {
        let message = new ChatMessage();
        message.files = this.files;
        message.text = 'Файл';
        this._stompService.sendMessage(message, this.id);
      }
    } catch (e) {
      console.error(e);
      alert('Повідомлення не доставлено');
    } finally {
      this.text='';
      this.files = [];
    }
  }

  loadMoreMessages(){
    this.currentPage+=1;
    this._chatRoom.findOneWithMessagesPageable(this.id,50*this.currentPage).subscribe(room => {
      this._stompService.minusRead(room.chatRoom,room.count);
      if (this._stompService.chatMessages.has(this.id)) {
        this.messages = room.chatRoom.messages;
        this.messages.sort((a, b) => {
          return new Date(a.datetime) < new Date(b.datetime) ? -1 : new Date(a.datetime) < new Date(b.datetime) ? 1 : 0;
        });
      }
    })
  }

  check(message: ChatMessage) {
    if (message.from.id != this.user.id) {
      return true;
    }
  }


  ngOnInit() {

  }

}

import {Component, Input, OnInit} from '@angular/core';
import {ChatRoom} from '../../../../../../shared/models/chat-room';
import {UserDetailsService} from '../../../../../../shared/service/user-details-service';
import {User} from '../../../../../../shared/models/user';
import {ImagePipe} from '../../../../../../shared/pipe/utils/image.pipe';
import {Alert} from 'selenium-webdriver';
import {isNullOrUndefined} from 'util';
import {DatePipe} from '@angular/common';
import {StompService} from '../../../../../../shared/service/stomp.service';
import {LocalDateTimeToDate} from '../../../../../../shared/pipe/utils/local-date-time-to-date';

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.css'],
  providers: [ImagePipe,LocalDateTimeToDate]
})
export class ChatContainerComponent implements OnInit {
  @Input() chatRoom: ChatRoom;
  image: string;
  user: User = new User();
  name: string = '';
  lastMsgStr: string='';

  constructor(private _userDetailsService: UserDetailsService, private imagePipe: ImagePipe, private date: LocalDateTimeToDate, private _stompService: StompService) {
    this.user = _userDetailsService.user;
    _userDetailsService.getUser().subscribe(next => {
      this.user = next;
    },error => {
        console.log(error);
    });
  }
  getLastMessage(){
    this.chatRoom.messages = this._stompService.chatMessages.get(this.chatRoom.id);
    this._stompService.chatMessages$.subscribe(next => {
      this.chatRoom.messages = next.get(this.chatRoom.id);
    },error => {
      console.log(error);
    });
    if(!isNullOrUndefined(this.chatRoom.messages[this.chatRoom.messages.length-1])) {
      let lastIndex=this.chatRoom.messages.length-1;
      if (this.chatRoom.messages[lastIndex].from.id == this.user.id) {
        if (this.chatRoom.messages[lastIndex].text.length >= 15)
          return this.lastMsgStr = 'Ви: ' + this.chatRoom.messages[lastIndex].text.substring(0, 10) + '...';
        if(this.chatRoom.messages[lastIndex].text.length==0)
          return this.lastMsgStr='Файл';
        else
        return this.lastMsgStr = 'Ви: ' + this.chatRoom.messages[lastIndex].text;
      } else {
        if (this.chatRoom.messages[lastIndex].text.length == 0)
          return this.lastMsgStr = 'Файл';
        if (this.chatRoom.messages[lastIndex].text.length >= 15)
          return this.lastMsgStr = this.chatRoom.messages[lastIndex].text.substring(0, 10) + '...';
        if(this.chatRoom.messages[lastIndex].hasBeenRead==false&&this.chatRoom.messages[lastIndex].text.length>=15)
          return this.lastMsgStr ='Нове повідомлення: ' + this.chatRoom.messages[lastIndex].text.substring(0, 10) + '...';
        if(this.chatRoom.messages[lastIndex].hasBeenRead==false)
          return this.lastMsgStr ='Нове повідомлення: ' + this.chatRoom.messages[lastIndex].text;
        else
        return this.lastMsgStr = this.chatRoom.messages[lastIndex].text;
      }
    }else{
      return 'Немає повідомлень';
    }
  }
  getLastDateTime(){
      if(!isNullOrUndefined(this.chatRoom.messages)||this.chatRoom.messages.length!=0)
        return this.date.transform(this.chatRoom.messages[this.chatRoom.messages.length-1].datetime);
  }
  ngOnInit() {
    if (this.chatRoom.users.length == 2) {
      this.chatRoom.users.forEach(next => {
        if (next.user.id != this.user.id) {
          this.image = this.imagePipe.transform(next.user.image);
          this.name = next.user.name + ' ' + next.user.lastname;
        }
      });
    } else {
      for(let i = 0 ; i < 2; i++){
        if(this.user!=this.chatRoom.users[i].user){
          this.name+=this.chatRoom.users[i].user.name+" "+this.chatRoom.users[i].user.lastname+', '
        }
      }
      if(this.name[this.name.length-1]==' '&&this.name[this.name.length-2]==','){
        this.name=this.name.substring(0,this.name.length-2)
      }
      this.image = '../../../../../../../assets/svg/multiple-users-silhouette.svg';
    }
  }


}

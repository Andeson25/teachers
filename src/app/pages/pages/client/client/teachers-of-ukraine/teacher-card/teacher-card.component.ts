import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../../../../shared/models/user';
import {Router} from '@angular/router';
import {UserDetailsService} from '../../../../../../shared/service/user-details-service';
import {ChatRoomService} from '../../../../../../shared/service/chat-room.service';
import {StompService} from '../../../../../../shared/service/stomp.service';
import {ChatRoom} from '../../../../../../shared/models/chat-room';

@Component({
  selector: 'app-teacher-card',
  templateUrl: './teacher-card.component.html',
  styleUrls: ['./teacher-card.component.css'],
  providers: [ChatRoomService]
})
export class TeacherCardComponent implements OnInit {
  @Input("user") user:User;
  @Output() deleteUser: EventEmitter<User> = new EventEmitter<User>();
  currentUserRole: string ='';

  constructor(private _chatRoomService: ChatRoomService,private _stompService: StompService, private _router: Router, private _user : UserDetailsService) {
    this.currentUserRole=this._user.user.role;
  }



  delete(){
    this.deleteUser.emit(this.user);
  }

  room: ChatRoom;
  startChat(){
    this._chatRoomService.createOrFindChatRoom(this.user.id).subscribe(room=>{
      this._stompService.addChatRoom(room);
        console.log(room);
        this.room=room;
    },error=>{
      console.log(error);
    }, ()=>{
      this._router.navigateByUrl('/chat/room/'+this.room.id)
    })
  }
  ngOnInit() {

  }



}

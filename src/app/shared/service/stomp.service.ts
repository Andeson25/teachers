import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {Injectable} from '@angular/core';
import {url} from '../config/url';
import {UserDetailsService} from './user-details-service';
import {User} from '../models/user';
import {ChatUserWrapperService} from './chat-user-wrapper.service';
import {Observable} from 'rxjs/Observable';
import {ChatMessageService} from './chat-message.service';
import {ChatRoomService} from './chat-room.service';
import {ChatMessage} from '../models/chat-message';
import {Subject} from 'rxjs/Subject';
import {ChatRoom} from '../models/chat-room';
import {isNullOrUndefined} from 'util';
import { Router} from '@angular/router';
import {UserService} from './user.service';

@Injectable()
export class StompService {
  user: User = new User();
  public chatRooms: ChatRoom[] = [];
  isAuth: boolean = false;
  timer = Observable.timer(15000, 15000);
  connected = false;

  private serverUrl = url + '/socket';
  private stompClient: Stomp;
  private _chatRooms = new Subject<ChatRoom[]>();
  chatRooms$ = this._chatRooms.asObservable();


  public chatMessages: Map<number, ChatMessage[]> = new Map<number, ChatMessage[]>();
  private _chatMessages = new Subject<Map<number, ChatMessage[]>>();
  chatMessages$ = this._chatMessages.asObservable();


  private unReadMessages: number = 0;
  private _unReadMessages = new Subject<number>();
  unReadMessages$ = this._unReadMessages.asObservable();

  constructor(private route: Router, private _chatMessageService: ChatMessageService, private  _userDetails: UserDetailsService, private _userWrapService: ChatUserWrapperService, private _chatRoomService: ChatRoomService, private _userMainService: UserService) {
    this._userDetails.checkAuthStorage().subscribe(next => {
      this.isAuth = next;
      if (!this.isAuth) {
        console.log('disconnect______');
        if (!isNullOrUndefined(this.stompClient)) {
          let ws = new SockJS(this.serverUrl);
          if (this.chatRooms.length != 0) {
            this.stompClient.disconnect();
            this.chatRooms.forEach(next => {
              this.stompClient.unsubscribe(next.id);
            });
            this.stompClient = Stomp.over(ws);
          }
          this.chatRooms = [];
          this._chatRooms.next(this.chatRooms);
          this.chatMessages=new Map<number, ChatMessage[]>();
          this._chatMessages.next(this.chatMessages);
          this.unReadMessages=0;
          this._unReadMessages.next(this.unReadMessages);
          this.connected=false;
        }
      }
      if (this.isAuth) {
        this.user = this._userDetails.user;
        console.log('connect______');
          console.log('observable');
          if (!isNullOrUndefined(this.user.id) && this.connected == false) {
            this._chatRoomService.findAllByUserId(this.user.id).subscribe(next => {
              console.log(next.length);
              this.chatRooms = next;
              this._chatRooms.next(this.chatRooms);
              this.addChatRooms();
              this.connected = true;
            }, error => {
              console.log(error);
              this.checkNewChatRoom();
            });
          }
      }
    });
    if (this._userDetails.checkAuth()) {
      this._userMainService.get().subscribe(next => {
        this._userDetails.loadUser(next);
        this._chatMessageService.getUnRead().subscribe(next => {
          this.unReadMessages = next;
          this._unReadMessages.next(this.unReadMessages);
        });
      });
    }


    // if (this.isAuth == false) {
    //   console.log('disconnect______');
    //   let ws = new SockJS(this.serverUrl);
    //   this.stompClient = Stomp.over(ws);
    //   this.boolean = false;
    // }
    // if (this.isAuth == true) {
    //   console.log('connect______');
    //   this.boolean=false;
    //   this.user = _userDetails.user;
    //   _userDetails.getUser().subscribe(next => {
    //     this.user = next;
    //     this._chatMessageService.getUnRead().subscribe(next => {
    //       this.unReadMessages = next;
    //       this._unReadMessages.next(this.unReadMessages);
    //     });
    //     this._chatRoomService.findAllByUserId(this.user.id).subscribe(next => {
    //       console.log(next);
    //       this.chatRooms = next;
    //       this._chatRooms.next(this.chatRooms);
    //       this.addChatRooms();
    //       this.initTimer();
    //     }, error => {
    //       console.log(error);
    //       this.checkNewChatRoom();
    //     });
    //   });
    // }
  }

  setRead(idRoom) {
    this.chatMessages.get(idRoom).forEach(next => {
        if (next.from != this.user)
          next.hasBeenRead = true;
        this._chatMessages.next(this.chatMessages);
      }
    );
  }

  minusRead(chatRoom: ChatRoom, count : number) {
    // for (let i = 0; i < this.chatRooms.length; ++i) {
    //   if (this.chatRooms[i].id == chatRoom.id) {
    //     this.chatRooms[i] = chatRoom;
    //     this._chatRooms.next(this.chatRooms);
    //   }
    // }
    this.chatMessages.set(chatRoom.id,chatRoom.messages);
    this._chatMessages.next(this.chatMessages);
    this.unReadMessages-=count;
    this._unReadMessages.next(this.unReadMessages);
    if(this.unReadMessages<0){
      this.unReadMessages=0;
      this._unReadMessages.next(this.unReadMessages);
    }
  }


  checkChatRoomsExist(chatRoom: ChatRoom, chatRoomArray: ChatRoom[]) {
    let exists = true;
    chatRoomArray.forEach(next => {
      if (next.id == chatRoom.id)
        exists = false;
    });
    return exists;
  }

  addChatRoom(chatRoom: ChatRoom) {
    if (this.chatRooms.indexOf(chatRoom) == -1&&this.checkChatRoomsExist(chatRoom,this.chatRooms)) {
      this.chatRooms.push(chatRoom);
      this._chatRooms.next(this.chatRooms);
    }
    this.connect(chatRoom.id);
  }

  connect(idRoom: number) {
    if (!this.chatMessages.has(idRoom)) {
      this.chatMessages.set(idRoom, []);
    }
    this.initializeWebSocketConnection();
  }

  addChatRooms() {
    for (let i = 0; i < this.chatRooms.length; i++) {
      if (!this.chatMessages.has(this.chatRooms[i].id)) {
        this.chatMessages.set(this.chatRooms[i].id, this.chatRooms[i].messages);
        this._chatMessages.next(this.chatMessages);
      }
    }
    this.initializeWebSocketConnection();
  }

  checkRoom(roomJson){
    for (let i = 0; i<this.chatRooms.length; i++){
      if(this.chatRooms[i].id==JSON.parse(roomJson).id){
        return true;
      }
    }
    return false
  }


  initializeWebSocketConnection() {
    console.log('uuuuuuuu___________');
      let that = this;
      let ws = new SockJS(this.serverUrl);
      this.stompClient = Stomp.over(ws);
      this.stompClient.connect({}, (frame) => {
        that.stompClient.subscribe('/chat.init-chat-room'+this.user.id, (room)=>{
          if(room.body&&!this.checkRoom(room.body)){
            this.chatRooms.push(JSON.parse(room.body));
            this._chatRooms.next(this.chatRooms);

            let key = JSON.parse(room.body).id;
            this.chatMessages.set(key,[]);
            this._chatMessages.next(this.chatMessages);
            that.stompClient.subscribe('/chat.' + JSON.parse(room.body).id ,(message)=>{
              if (message.body && this.checkMessage(JSON.parse(message.body), key)){
                if (JSON.parse(message.body).from.id != this.user.id) {
                  if(this.route.url!='/chat/room/'+ key)
                  {
                    this.unReadMessages += 1;
                    this._unReadMessages.next(this.unReadMessages);
                  }
                  if(this.route.url=='/chat/room/'+ key)
                  {
                    for(let i =0; i< this.chatMessages.get(key).length; i++){
                      if( this.chatMessages.get(key)[i].hasBeenRead==false&& this.chatMessages.get(key)[i].from.id==this.user.id){
                        this.chatMessages.get(key)[i].hasBeenRead=true;
                      }
                    }
                  }
                }
                this.chatMessages.get(key).push(JSON.parse(message.body));
                this._chatMessages.next(this.chatMessages);
                this._chatRooms.next(this.chatRooms);
              }
            });
          }
        });
        this.chatMessages.forEach((value, key) => {
          that.stompClient.subscribe('/chat.' + key, (message) => {
            if (message.body && this.checkMessage(JSON.parse(message.body), key)) {
              if (JSON.parse(message.body).from.id != this.user.id) {
                if (this.route.url != '/chat/room/' + key) {
                  this.unReadMessages += 1;
                  this._unReadMessages.next(this.unReadMessages);
                }
                if (this.route.url == '/chat/room/' + key) {
                  for (let i = 0; i < this.chatMessages.get(key).length; i++) {
                    if (this.chatMessages.get(key)[i].hasBeenRead == false && this.chatMessages.get(key)[i].from.id == this.user.id) {
                      this.chatMessages.get(key)[i].hasBeenRead = true;
                    }
                  }
                }
              }
              this.chatMessages.get(key).push(JSON.parse(message.body));
              this._chatMessages.next(this.chatMessages);
              this._chatRooms.next(this.chatRooms);
            }
          });
        });
      });
  }

  findRoomByKey(key): ChatRoom{
    let room = new ChatRoom();
      this.chatRooms.forEach(next=>{
        if(next.id===key){
           room=next
        }
      });
    console.log('founded room ' + room.id + "key was "+key);
    return room;
}

  checkMessage(message: ChatMessage, key) {
    let exists = true;
    for (let i = 0; i < this.chatMessages.get(key).length; i++) {
      if (this.chatMessages.get(key)[i].id == message.id)
        exists = false;
    }
    return exists;
  }

  initTimer() {
    if (this.isAuth == true) {
      this.timer.subscribe(() => {
        this.checkNewChatRoom();
      });
    }
  }

  checkNewChatRoom() {
    if (this.isAuth == true) {
      this._chatRoomService.findAllByUserId(this.user.id).subscribe(next => {
        if (next.length > this.chatRooms.length) {
          this.chatRooms = next;
          this._chatRooms.next(this.chatRooms);
          this.addChatRooms();
        }
      }, error => {
        console.error(error);
      });
    }
  }

  sendMessage(message, idRoom) {
    this._chatMessageService.sendMessage(message, idRoom).subscribe(next => {
    }, error => {
      console.error(error);
    });
  }

  getChatRoomMessagesById(idRoom: number): ChatMessage[] {
    for (let i = 0; i < this.chatRooms.length; i++) {
      if (this.chatRooms[i].id == idRoom)
        return this.chatRooms[i].messages;
    }
  }
}



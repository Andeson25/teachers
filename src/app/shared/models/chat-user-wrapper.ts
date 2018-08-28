import {User} from "./user";
import {ChatRoom} from './chat-room';

export class ChatUserWrapper {
  id: number;
  user: User;
  datetime: string;
  available: boolean = true;
  chatRooms: ChatRoom[] = [];
}

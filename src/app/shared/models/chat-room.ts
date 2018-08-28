import {ChatUserWrapper} from "./chat-user-wrapper";
import {ChatMessage} from "./chat-message";

export class ChatRoom {
  id: number;
  users: ChatUserWrapper[] = [];
  messages: ChatMessage[] = [];
  available: boolean = true;
}

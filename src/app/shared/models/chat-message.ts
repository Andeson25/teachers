import {User} from "./user";
import {File} from "./file";

export class ChatMessage {
  id: number;
  datetime: string;
  text: string;
  from: User;
  hasBeenRead: boolean=false;
  files: File[] = [];
  available: boolean = true;
}

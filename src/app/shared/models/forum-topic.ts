import {ForumSection} from "./forum-section";

import {User} from "./user";
import {ForumMessage} from "./forum-message";

export class ForumTopic {
  id: number;
  header: string;
  author: User;
  datetime: string;
  text: string;
  forumSection: ForumSection;
  messages: ForumMessage[] = [];
  available: boolean = true;
}

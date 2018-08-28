import {User} from './user';
import {ForumTopic} from './forum-topic';

export class ForumMessage {
  id: number;
  datetime: string;
  from: User;
  text: string;
  files: File[] = [];
  available: boolean = true;
  forumTopic: ForumTopic;
}

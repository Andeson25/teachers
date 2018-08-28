import {User} from "./user";
import {File} from "./file";
import {Article} from './article';
import {Course} from './course';

export class Comment {
  id: number;
  datetime: string;
  text: string;
  from: User;
  files: File[] = [];
  article: Article;
  course: Course;
  available: boolean = true;
}

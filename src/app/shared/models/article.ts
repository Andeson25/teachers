import {Comment} from "./comment";

export class Article {
  id: number;
  image: string;
  header: string;
  datetime: string;
  text: string;
  available: boolean = true;
  comments: Comment[] = [];
}

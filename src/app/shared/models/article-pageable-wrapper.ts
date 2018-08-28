import {Article} from './article';

export class ArticlePageableWrapper{
  articles: Article[]=[];
  currentPage: number;
  numberOfPages: number;
  numberOfItems: number;
}

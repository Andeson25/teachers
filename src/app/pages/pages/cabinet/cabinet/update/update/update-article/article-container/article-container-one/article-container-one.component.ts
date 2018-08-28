import {Component, Input, OnInit} from '@angular/core';
import {Article} from '../../../../../../../../../shared/models/article';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-article-container-one',
  templateUrl: './article-container-one.component.html',
  styleUrls: ['./article-container-one.component.css']
})
export class ArticleContainerOneComponent implements OnInit {

  @Input() article: Article;

  constructor() {
  }

  get(obj: any): any {
    if (isNullOrUndefined(obj))
      return '';
    return obj;
  }

  ngOnInit() {
  }

}

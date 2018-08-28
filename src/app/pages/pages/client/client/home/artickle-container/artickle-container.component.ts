import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../../../../../../shared/service/article.service';
import {Article} from '../../../../../../shared/models/article';

@Component({
  selector: 'app-artickle-container',
  templateUrl: './artickle-container.component.html',
  styleUrls: ['./artickle-container.component.css'],
  providers: [ArticleService]
})
export class ArticleContainerComponent implements OnInit {

  popularArticles: Article[] = [];


  currentPage: number = 1;
  numberOfAllPages: number;
  bool = true;

  backBool: boolean;

  articles: Article[] = [];
  show=false;
  constructor(private _articleService: ArticleService) {
    this._articleService.findPopular().subscribe(next => {
      this.popularArticles = next;
    },error => {
        console.log(error);
    });
    this._articleService.findAllAvailablePageable(this.currentPage-1, 6).subscribe(next => {
      console.log('current page= '+ next.currentPage);
      console.log('pages = '+ next.numberOfPages);
      this.articles = next.articles;
      this.currentPage=next.currentPage+1;
      this.backBool=this.currentPage==1;
      this.numberOfAllPages=next.numberOfPages;
    });
  }

  loadPage(zsuv: number) {
    this._articleService.findAllAvailablePageable(zsuv-1, 6).subscribe(next => {
      this.articles = next.articles;
      this.currentPage=next.currentPage+1;
      this.backBool=this.currentPage==1;
      this.numberOfAllPages=next.numberOfPages;
      console.log('current page= '+ next.currentPage);
      console.log('pages = '+ next.numberOfPages);
    });
  }

  delete(art: Article) {
    art.available = false;
    this._articleService.update(JSON.stringify(art)).subscribe(next => {
      this.loadPage(this.articles.length == 1 ? this.currentPage == 1 ? this.currentPage : this.currentPage-1 : this.currentPage);
      this._articleService.findPopular().subscribe(next => {
        this.popularArticles = next;
      },error => {
        console.log(error);
      });
    }, error => {
      console.log(error);
    });
  }

  prePage() {
    this.loadPage(this.currentPage-1);
  }

  nextPage() {
    this.loadPage(this.currentPage+1);
  }

  ngOnInit() {

  }

}

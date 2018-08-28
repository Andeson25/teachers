import {Component, OnDestroy, OnInit} from '@angular/core';
import {Article} from '../../../../../../shared/models/article';
import {ArticleService} from '../../../../../../shared/service/article.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CommentService} from '../../../../../../shared/service/comment.service';
import {Comment} from '../../../../../../shared/models/comment';
import {User} from '../../../../../../shared/models/user';
import {UserDetailsService} from '../../../../../../shared/service/user-details-service';
import {MetaRxService} from '../../../../../../shared/service/meta-rx/meta-rx.service';

@Component({
  selector: 'app-artickle-one',
  templateUrl: './artickle-one.component.html',
  styleUrls: ['./artickle-one.component.css'],
  providers: [ArticleService, CommentService]
})
export class ArtickleOneComponent implements OnInit, OnDestroy {

  article: Article = new Article();
  myLastComment = new Comment();
  isAuth: boolean =false ;
  user: User = new User();



  constructor(private _userDetailsService: UserDetailsService,private _articleService: ArticleService, private activateRoute: ActivatedRoute, private _commentService: CommentService,private _route: Router,private meta: MetaRxService ) {

    this.activateRoute.params.subscribe(next => {
      this._articleService.findOne(next['id']).subscribe(next => {
        this.article = next;
        let text: string = '';
        if (this.article.text.length >= 175) {
          text = this.article.text.substring(0, 174);
        } else {
          if (this.article.text.split('.').length >= 3) {
            for (let i = 0; i < 3;) {
              text = this.article.text.split('.')[i];
            }
          }
          if(this.article.text.split('.').length<3){
            text=this.article.text
          }
        }
        let one: any = [{name: 'description', content: text},{name:'keywords',content: this.article.header}];
        this.meta.updateMeta(one);
        this.meta.updateTitle(this.article.header);
      }, error => {
        console.log(error);
      });
    });
    this.isAuth=_userDetailsService.isAuth;
    this.user=_userDetailsService.user;
    this._userDetailsService.checkAuthStorage().subscribe(next=>{
      this.isAuth=next;
    });
    this. _userDetailsService.getUser().subscribe(next => {
      this.user = next;
    });
  }



  ngOnDestroy(): void {
    this.meta.setDefaultAll();
  }



  sendComment(text: HTMLTextAreaElement) {
    if (text.value.length != 0) {
      this.myLastComment.available = true;
      this.myLastComment.text = text.value;
      text.style.borderColor = '';
      this._commentService.saveArticle(this.myLastComment, this.article.id).subscribe(next => {
        text.value = '';
        this.article.comments.push(next);
      }, error => {
        console.error(error);
        alert('Не вдалось надіслати повідомлення, помилка:['+error.status+']');
      });

    } else {
      text.style.borderColor = 'red';
    }
  }
  delete(){
    this.article.available=false;
    this._articleService.update(JSON.stringify(this.article)).subscribe(next=>{
      this._route.navigateByUrl('/');
    },error => {
      console.log(error);
    })
  }
  deleteComment(comment: Comment){
    comment.available=false;
    this._commentService.delete(comment.id).subscribe(next=>{
        this.article.comments.splice(this.article.comments.indexOf(comment),1);
    },error => {
        console.log(error);
    })
  }

  ngOnInit() {

  }



}

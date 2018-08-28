import {Component, OnInit} from '@angular/core';
import {ArticleService} from '../../../../../../../../shared/service/article.service';
import {Article} from '../../../../../../../../shared/models/article';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ImagePipe} from '../../../../../../../../shared/pipe/utils/image.pipe';

@Component({
  selector: 'app-article-one',
  templateUrl: './article-one.component.html',
  styleUrls: ['./article-one.component.css'],
  providers: [ArticleService,ImagePipe]
})
export class ArticleOneComponent implements OnInit {

  articleForm: FormGroup;
  article: Article = new Article();
  articleJson: string;
  id: number;
  header: string;
  text: string;
  img: string;
  string: string;

  constructor(private _articleService: ArticleService, private _activatedRoute: ActivatedRoute, private _img: ImagePipe) {
    this._activatedRoute.params.subscribe(next => {
      console.log(next['id']);
      this._articleService.findOne(next['id']).subscribe(next => {
        console.log(next);
        this.article = next;
        this.id = next.id;
        this.text = next.text;
        this.header = next.header;
        this.img=_img.transform(next.image);
      });
    });
  }

  checkaq(el: HTMLTextAreaElement) {
    console.log('value=' + el.value);
  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.img = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  addArticle(form: HTMLFormElement) {
    this._articleService.update(this.articleJson, form).subscribe(next => {
      // this.articleForm.reset();
      console.log(JSON.stringify(next));
      this.article = next;
      this.img=this._img.transform(next.image);
    }, error => {
      // console.log(JSON.stringify(this.article));
      // console.log(imageForm.files[0]);
      console.error(error);
    },()=>{
      alert('Готово');
    });
  }

  ngOnInit() {
    this.articleForm = new FormGroup({
      id: new FormControl('', Validators.required),
      header: new FormControl('', Validators.required),
      text: new FormControl('', Validators.required),
    });
    this.articleForm.valueChanges.subscribe(next => {
      this.article = next;
      this.article.available=true;
      this.articleJson = JSON.stringify(this.article);
    });
  }


}

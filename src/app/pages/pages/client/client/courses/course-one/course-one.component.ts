import {AfterContentInit, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseService} from '../../../../../../shared/service/course.service';
import {Course} from '../../../../../../shared/models/course';
import {UserDetailsService} from '../../../../../../shared/service/user-details-service';
import {User} from '../../../../../../shared/models/user';
import {Comment} from '../../../../../../shared/models/comment';
import {CommentService} from '../../../../../../shared/service/comment.service';
import {MetaRxService} from '../../../../../../shared/service/meta-rx/meta-rx.service';

@Component({
  selector: 'app-course-one',
  templateUrl: './course-one.component.html',
  styleUrls: ['./course-one.component.css'],
  providers: [CourseService, CommentService]
})
export class CourseOneComponent implements OnInit, AfterViewInit, OnDestroy {
  course: Course = new Course();
  isAuth: boolean = false;
  user: User = new User();
  myLastComment = new Comment();

  constructor(private _router: Router,private _route: ActivatedRoute, private _course: CourseService, private _userDetailsService: UserDetailsService, private _commentService: CommentService, private meta: MetaRxService ) {
    this._route.params.subscribe(next => {
      this._course.findOneAvailable(next['id']).subscribe(next => {
        this.course = next;
        let one:any =[{ name: 'description', content: this.course.description}, { name: 'keywords', content: this.course.description}];
        this.meta.updateMeta(one);
        this.meta.updateTitle(this.course.header);
      }, error => {
        console.log(error);
      });
    }, error => {
      console.log(error);
    });
    this.isAuth = _userDetailsService.isAuth;
    this.user = _userDetailsService.user;
    this._userDetailsService.checkAuthStorage().subscribe(next => {
      this.isAuth = next;
    });
    this._userDetailsService.getUser().subscribe(next => {
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
      this._commentService.saveCourse(this.myLastComment, this.course.id).subscribe(next => {
        text.value = '';
        this.course.comments.push(next);
      }, error => {
        console.error(error);
        alert('невдалось надіслати повідомлення помилка:['+error.status+']');
      });

    } else {
      text.style.borderColor = 'red';
    }
  }

  vote(rating: number){
    if(this.course.userRating==0) {
      this._course.vote(this.course.id, rating).subscribe(next => {
        this.course = next;
      }, error => {
        console.log(error);
      });
    }
  }

  deleteComment(comment: Comment){
    this.course.comments.splice(this.course.comments.indexOf(comment),1);
    this._commentService.delete(comment.id).subscribe(next=>{

    },error => {
        console.log(error);
    })
  }

  delete(){
    this.course.available=false;
    this._course.update(JSON.stringify(this.course)).subscribe(next=>{
      this._router.navigateByUrl('/courses');
    },error => {
        console.log(error);
    })
  }

  ngAfterViewInit(): void {

  }

  ngOnInit() {

  }


}

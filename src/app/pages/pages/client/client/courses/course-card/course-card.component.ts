import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {Course} from '../../../../../../shared/models/course';
import {UserDetailsService} from '../../../../../../shared/service/user-details-service';
import {User} from '../../../../../../shared/models/user';


@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnInit {
  @Input() course: Course = new Course();
  @Output() deleteCourse: EventEmitter<Course> = new EventEmitter<Course>();
  user: User = new User();

  constructor(private _user: UserDetailsService){
    this.user=this._user.user;
    this._user.getUser().subscribe(next=>{
      this.user=next;
    })
  }

  delete(){
    this.deleteCourse.emit(this.course);
  }


  ngOnInit() {
  }

}

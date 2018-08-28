import {Component, OnInit} from '@angular/core';
import {CourseService} from '../../../../../../../shared/service/course.service';
import {Course} from '../../../../../../../shared/models/course';

@Component({
  selector: 'app-course-container',
  templateUrl: './course-container.component.html',
  styleUrls: ['./course-container.component.css'],
  providers: [CourseService]
})
export class CourseContainerComponent implements OnInit {

  courseList: Course[] = [];

  constructor(private _courseService: CourseService) {
    this._courseService.findAllAvailable().subscribe(next => {
      this.courseList = next;
    }, err => {
      console.error(err);
    });
  }

  ngOnInit() {
  }

}

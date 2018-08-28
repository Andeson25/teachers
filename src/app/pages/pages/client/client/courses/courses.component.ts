import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CourseService} from '../../../../../shared/service/course.service';

import {Course} from '../../../../../shared/models/course';
import {Category} from '../../../../../shared/models/category';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  providers: [CourseService]
})
export class CoursesComponent implements OnInit {

  constructor(){}

  ngOnInit(){}
}

import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CourseService} from '../../../../../../../shared/service/course.service';
import {Course} from '../../../../../../../shared/models/course';
import {courseTypes} from '../../../../../../../shared/utils/utils';
import {CourseCategory} from '../../../../../../../shared/models/course-category';
import {CourseCategoryService} from '../../../../../../../shared/service/course-category.service';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
  providers: [CourseService, CourseCategoryService]
})
export class AddCourseComponent implements OnInit {

  courseForm: FormGroup;
  courseJson: string;
  course: Course = new Course();
  categories: CourseCategory[] = [];
  types = courseTypes;
  createCategory = false;
  categoryForm: FormGroup;
  newCategory: CourseCategory = new CourseCategory();
  @ViewChild('select') select: HTMLSelectElement;
  img: string;

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.img = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  constructor(private _courseService: CourseService, private _categoryService: CourseCategoryService) {
    this._categoryService.findAll().subscribe(next => {
      this.categories = next;
    }, error => {
      console.log(error);
    });

  }

  ngOnInit() {
    this.courseForm = new FormGroup({
      header: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      link: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      courseCategory: new FormControl('', Validators.required),
    });
    this.courseForm.valueChanges.subscribe(next => {
      this.course = next;
      this.courseJson = JSON.stringify(this.course);
      if (next.category == 'new') {
        this.createCategory = true;
        this.course.courseCategory = null;
      }
    });
    this.categoryForm = new FormGroup({
      name: new FormControl('', Validators.required)
    });
    this.categoryForm.valueChanges.subscribe(next => {
      this.newCategory = next;
    });

  }

  addCategory( el: HTMLSelectElement) {
    el.value = '';
    console.log(this.newCategory);
    this._categoryService.save(this.newCategory).subscribe(next => {
      this.categories.push(next);
      this.newCategory = new CourseCategory();
      this.categoryForm.reset();
      this.createCategory = false;
    },()=>{
      alert("Готово")
    });
  }

  addCourse(imageForm: HTMLFormElement,file:HTMLInputElement) {
    console.log(this.course);
    console.log(JSON.stringify(this.course));
    this._courseService.saveWithImg(imageForm, this.courseJson).subscribe(next => {
      console.log(this.course);
      this.courseForm.reset();
      this.img=null;
      file.value='';
      console.log(JSON.stringify(next));
    }, error2 => {
      console.log(error2);
    },()=>{
      alert('Готово');
    });
  }

  validSelect(el: HTMLSelectElement){
    if(el.value == 'new' || el.value == ''){
      return false;
    }
  }



  changeValue(el: HTMLSelectElement) {
    if (el.value == 'new') {
      this.createCategory = true;
      el.value = '';
    }
    else {
      this.createCategory = false;
    }
  }
  getTypeKeys() {
    return Array.from(this.types.keys());
  }

}

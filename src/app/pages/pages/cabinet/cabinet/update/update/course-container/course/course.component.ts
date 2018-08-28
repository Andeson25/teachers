import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CourseService} from '../../../../../../../../shared/service/course.service';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../../../../../../../../shared/models/course';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Category} from '../../../../../../../../shared/models/category';
import {CategoryService} from '../../../../../../../../shared/service/category.service';
import {courseTypes, fromNullOrUndefined} from '../../../../../../../../shared/utils/utils';
import {CourseCategory} from '../../../../../../../../shared/models/course-category';
import {CourseCategoryService} from '../../../../../../../../shared/service/course-category.service';
import {ImagePipe} from '../../../../../../../../shared/pipe/utils/image.pipe';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  providers: [CourseService, CourseCategoryService,ImagePipe]
})
export class CourseComponent implements OnInit {

  courseForm: FormGroup;
  courseJson: string;
  course: Course = new Course();
  categories: CourseCategory[] = [];
  types = courseTypes;
  @ViewChild('catSel') categorySelect: ElementRef;
  img: string;
  prevImage: string;

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.img = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  constructor(private _courseService: CourseService, private _categoryService: CourseCategoryService, private _activatedRoute: ActivatedRoute, private _imgPipe: ImagePipe) {
    this._activatedRoute.params.subscribe(next => {
      this._courseService.findOne(next['id']).subscribe(next => {
        this.course = next;
        this.img=this._imgPipe.transform(next.image);
        this.prevImage=next.image;
        this.courseJson = JSON.stringify(this.course);
        this.initForm();
      }, err => {
        console.error(err);
      });
    });
    this._categoryService.findAllAvailable().subscribe(next => {
      this.categories = next;
    }, err => {
      console.error(err);
    });
  }

  addCourse(imageForm: HTMLFormElement) {
    this._courseService.update(this.courseJson, imageForm).subscribe(next => {
      console.log(next);
      this.course = next;
      this.courseJson = JSON.stringify(this.course);
      this.initForm();
    }, error2 => {
      console.log(error2);
    },()=>{
      alert("Готово")
    });
  }

  initForm() {
      this.courseForm.setValue({
        id: fromNullOrUndefined(this.course.id),
        header: fromNullOrUndefined(this.course.header),
        description: fromNullOrUndefined(this.course.description),
        link: fromNullOrUndefined(this.course.link),
        type: fromNullOrUndefined(this.course.type),
        courseCategory: fromNullOrUndefined(this.course.courseCategory),
      });
      let options = (<HTMLSelectElement>this.categorySelect.nativeElement).options;
      for (let i = 0; i < options.length; i++) {
        // console.log(options.item(i).text + ' : ' + options.item(i).selected + '   ' + this.course.category.name);
        options.item(i).selected = options.item(i).text == this.course.courseCategory.name;
      }
      this.courseForm.valueChanges.subscribe(next => {
        this.course = next;
        this.course.image=this.prevImage;
        this.courseJson = JSON.stringify(this.course);
      });
  }

  ngOnInit() {
    this.courseForm = new FormGroup({
      id: new FormControl('', Validators.required),
      header: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      link: new FormControl('', Validators.required),
      type: new FormControl(),
      courseCategory: new FormControl(),
    });
  }

  getTypeKeys() {
    return Array.from(this.types.keys());
  }

}

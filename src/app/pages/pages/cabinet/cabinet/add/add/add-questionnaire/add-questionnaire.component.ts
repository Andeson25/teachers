import {Component, OnInit} from '@angular/core';
import {Questionnaire} from '../../../../../../../shared/models/questionnaire';
import {CourseCategory} from '../../../../../../../shared/models/course-category';
import {CourseCategoryService} from '../../../../../../../shared/service/course-category.service';
import {QuestionnaireService} from '../../../../../../../shared/service/questionnaire.service';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-questionnaire',
  templateUrl: './add-questionnaire.component.html',
  styleUrls: ['./add-questionnaire.component.css'],
  providers: [CourseCategoryService, QuestionnaireService]
})
export class AddQuestionnaireComponent implements OnInit {

  questionnaire: Questionnaire = new Questionnaire();
  courseCategory: CourseCategory = new CourseCategory();
  courseCategories: CourseCategory[] = [];
  courseCategoriesToQuestionnaire: CourseCategory[] = [];


  checkForm: boolean = false;


  constructor(private _courseCategoryService: CourseCategoryService, private _questionnaireService: QuestionnaireService) {
    this._courseCategoryService.findAllAvailable().subscribe(next => {
      this.courseCategories = next;
    }, error => {
      console.error(error);
    });
  }

  showForm(el: HTMLSelectElement) {
    console.log(JSON.stringify(el.value))
    if (el.value == '1')
      this.checkForm = true;
    else
      this.checkForm = false;
  }

  stringify(obj: any): string {
    return JSON.stringify(obj);
  }

  ngOnInit() {
  }

  deleteCheck(check: HTMLInputElement, index: number, category: CourseCategory) {
    if (!check.checked) {
      this.courseCategoriesToQuestionnaire.splice(index, 1);
    }else{
      this.courseCategoriesToQuestionnaire.push(category);
    }
    console.log(this.courseCategoriesToQuestionnaire);
  }


  addCourseCategory(courseCategory: CourseCategory) {
    if (this.courseCategoriesToQuestionnaire.indexOf(courseCategory) == -1) {
      this.courseCategoriesToQuestionnaire.push(courseCategory);
      console.log(courseCategory);
    } else {
      console.log(courseCategory + 'already exist');
    }
  }

  delete(category: CourseCategory) {
    this.courseCategoriesToQuestionnaire =
      this.courseCategoriesToQuestionnaire.filter(courseCategory => courseCategory != category);
  }

  saveQuestionnaire() {

    this.questionnaire.courseCategories = this.courseCategoriesToQuestionnaire;
    console.log(JSON.stringify(this.questionnaire));
    this._questionnaireService.save(this.questionnaire).subscribe(next => {
      console.log(JSON.stringify(next));
      this.courseCategories.length = 0;
    }, error => {
      console.error(error);
    },()=>{
      alert("Готово")
    });
  }


}

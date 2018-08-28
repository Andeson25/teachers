import {NgModule} from '@angular/core';
import {GlobalImportsModule} from '../../../../../shared/config/global-imports/global-imports.module';
import {AddCategoryComponent} from './add/add-category/add-category.component';
import {AddArticleComponent} from './add/add-article/add-article.component';
import {AddCourseComponent} from './add/add-course/add-course.component';
import {AddForumTopicComponent} from './add/add-forum-topic/add-forum-topic.component';
import {AddComponent} from "./add/add.component";
import {AddTeachingProgramComponent} from "./add/add-teaching-program/add-teaching-program.component";
import {AddForumSectionComponent} from './add/add-forum-section/add-forum-section.component';
import {AddLawComponent} from "./add/add-law/add-law.component";
import { AddQuestionnaireComponent } from './add/add-questionnaire/add-questionnaire.component';


@NgModule({
  imports: [
    GlobalImportsModule,
  ],
  declarations: [
    AddComponent,
    AddArticleComponent,
    AddCategoryComponent,
    AddCourseComponent,
    AddForumTopicComponent,
    AddLawComponent,
    AddTeachingProgramComponent,
    AddTeachingProgramComponent,
    AddForumSectionComponent,
    AddQuestionnaireComponent
  ]
})
export class AddModule {
}


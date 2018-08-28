import {NgModule} from '@angular/core';
import {GlobalImportsModule} from '../../../../../shared/config/global-imports/global-imports.module';
import {UpdateComponent} from './update/update.component';
import { CourseContainerComponent } from './update/course-container/course-container.component';
import { CourseComponent } from './update/course-container/course/course.component';
import { ForumSectionContainerComponent } from './update/forum-section-container/forum-section-container.component';
import { ForumSectionContainerOneComponent } from './update/forum-section-container/forum-section-container-one/forum-section-container-one.component';
import { ForumSectionOneComponent } from './update/forum-section-container/forum-section-container-one/forum-section/forum-section-one/forum-section-one.component';
import { ForumTopicComponent } from './update/forum-section-container/forum-section-container-one/forum-section/forum-section-one/forum-topic/forum-topic.component';
import { LawContainerComponent } from './update/law-container/law-container/law-container.component';
import { LawContainerOneComponent } from './update/law-container/law-container-one/law-container-one.component';
import { LawComponent } from './update/law-container/law-container-one/law/law.component';
import { UpdateArticleComponent } from './update/update-article/update-article.component';
import { ArticleOneComponent } from './update/update-article/article-one/article-one.component';
import { ArticleContainerOneComponent } from './update/update-article/article-container/article-container-one/article-container-one.component';
import {ArticleContainerComponent} from "./update/update-article/article-container/article-container.component";
import { TeachingProgramContainerComponent } from './update/teaching-program-container/teaching-program-container.component';
import { TeachingProgramContainerOneComponent } from './update/teaching-program-container/teaching-program-container-one/teaching-program-container-one.component';
import { TeachingProgramComponent } from './update/teaching-program-container/teaching-program-container-one/teaching-program/teaching-program.component';
import { UpdateLawComponent } from './update/law-container/update-law.component';


@NgModule({
  imports: [
    GlobalImportsModule
  ],
  declarations: [
    UpdateComponent,
    CourseContainerComponent,
    CourseComponent,
    ForumSectionContainerComponent,
    ForumSectionContainerOneComponent,
    ForumSectionOneComponent,
    ForumTopicComponent,
    LawContainerComponent,
    LawContainerOneComponent,
    LawComponent,
    UpdateArticleComponent,
    ArticleOneComponent,
    ArticleContainerOneComponent,
    ArticleContainerComponent,
    TeachingProgramContainerComponent,
    TeachingProgramContainerOneComponent,
    TeachingProgramComponent,
    UpdateLawComponent
  ]
})
export class UpdateModule {

}

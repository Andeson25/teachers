import {CourseCategory} from './course-category';
import {User} from './user';

export class Questionnaire{

  id: number;
  courseCategories: CourseCategory[] = [];
  canVote: boolean ;
  users: User[]=[];

}

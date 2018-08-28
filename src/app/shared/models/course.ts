import {Comment} from './comment';
import {CourseCategory} from './course-category';


export class Course {
  id: number;
  header: string;
  description: string;
  image: string;
  rating: number;
  userRating: number;
  link: string;
  courseCategory: CourseCategory;
  type: string;
  available: boolean = true;
  comments: Comment[] = [];
}

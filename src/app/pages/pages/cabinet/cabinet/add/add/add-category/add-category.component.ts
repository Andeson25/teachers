import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../../../../../../shared/service/category.service";
import {Category} from "../../../../../../../shared/models/category";



@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
  providers: [CategoryService]
})
export class AddCategoryComponent implements OnInit {

  categoryForm: FormGroup;

  category: Category = new Category();

  constructor(private _categoryService: CategoryService) {

  }

  addCategory(){
    this._categoryService.save(this.category).subscribe(next=> {
      this.categoryForm.reset();
      console.log(JSON.stringify(next));
    }, error => {
        console.error(error);
    });
  }

  ngOnInit() {
    this.categoryForm = new FormGroup({
      name: new FormControl('', Validators.required),
    });
    this.categoryForm.valueChanges.subscribe(next =>{
      this.category = next;
    })

  }

}

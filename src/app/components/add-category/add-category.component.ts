import { Component, OnInit } from '@angular/core';
import {Category} from '../../models/category';
import {CategoryService} from '../../services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  constructor(private categoryService:CategoryService) { }

  category_input_name="";
  categories:Array<Category>;

  ngOnInit(): void {
    this.getCategories();
  }

  addCategory(){
    let category = new Category();
    //category.id = 1;
    category.name = this.category_input_name;
    //this.categories.push(category);
    this.categoryService.addCategory(category).then(
      data => {console.log("addCategory() called; category:",category.id+" , "+category.name);
              this.getCategories();},
      error => {console.log("Issue while adding a category.");}      
    );  
    
  }

  getCategories(){
    this.categoryService.getCategories().then(
      data => {this.categories  = data; console.log("Getting the categories from the promise.");},
      error => { console.log("Issue with getting the categories from the promise.");}
    )
  }

  deleteCategory(id:number){
    this.categoryService.deleteCategory(id);
    this.getCategories();
  }

}

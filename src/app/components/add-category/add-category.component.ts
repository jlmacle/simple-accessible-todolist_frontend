import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item';
import {Category} from '../../models/category';
import {EntryService} from '../../services/entry.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  constructor(private entryService:EntryService) { }

  category_input_name="";
  item_input_name="";
  categories:Array<Category>;
  items:Array<Item>;
  //Temp for progressing
  category_items:Array<Item>;
  

  ngOnInit(): void {
    this.getCategories();
  }

  addCategory(){
    let category = new Category();
    //category.id = 1;
    category.name = this.category_input_name;
    //this.categories.push(category);
    this.entryService.addCategory(category).then(
      data => {console.log("addCategory() called; category:",category.id+" , "+category.name);
              this.getCategories();},
      error => {console.log("Issue while adding a category.");}      
    );  
    
  }

  getCategories(){
    this.entryService.getCategories().then(
      data => {this.categories  = data; console.log("Getting the categories from the promise.");},
      error => { console.log("Issue with getting the categories from the promise.");}
    )
  }

  deleteCategory(id:number){
    this.entryService.deleteCategory(id).then(
      data => {console.log("Category deleted. i");this.getCategories();},
      error =>{console.log("Issue while deleting a category.");}
    );    
  }

  foldUnfoldCategory(id:number){    
    let toggledElement = document.getElementById("items"+id);
    if (toggledElement.style.getPropertyValue('visibility')=='hidden'){
      toggledElement.style.setProperty('visibility',"visible");
      toggledElement.style.setProperty("display","block");
    }
    else{
      toggledElement.style.setProperty('visibility',"hidden");
      toggledElement.style.setProperty("display","none");
    }
    //query to get all the items
    
  }

  addItem(categoryId:number){
    console.log("Add item for the category: "+categoryId);
    let item = new Item();
    item.id=1;//TODO
    item.name = this.item_input_name;
    item.categoryId = categoryId;
    this.entryService.addItem(item, categoryId).then(
      data => {console.log("Item Added to category id: "+categoryId);},
      error => {console.log("Error while adding an item: ",error);}
    )
  }
//Variable numbers of items. Gettting all items at once.
  getItems(){
    let goal = "the list of items.";
    this.entryService.getItems().then(      
      (data) => {/*this.items=data;*/ this.category_items = data; console.log("Getting "+goal);}, 
      (error) => {console.log("Error getting "+goal);}
    );
    console.log("goal:"+goal);
    //Todo: Sorting by category id

  }
}

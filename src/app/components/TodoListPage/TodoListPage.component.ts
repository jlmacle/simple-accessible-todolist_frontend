import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item';
import {Category} from '../../models/category';
import {EntryService} from '../../services/entry.service';

@Component({
  selector: 'app-TodoListPage',
  templateUrl: './TodoListPage.component.html',
  styleUrls: ['./TodoListPage.component.css']
})

export class ToDoListPageComponent implements OnInit {

  constructor(private entryService:EntryService) { }
  //used to define a new category
  category_input_name="";
  //used to define a new item
  selected_category_id:number;  
  //todo: remove selected when done 
  selected="by default";
  item_input_name="";

  //used to display existing categories and items
  categories:Array<Category>;
  all_items:Array<Item>=[];
  
  items_sorted_by_category = new Map();
  items_for_a_specific_category:Array<Item>; 

  ngOnInit(): void {
    this.getCategories();
  }

  addCategory(){
    //Creating a category object that will be later on translated to JSON and transmitted in an HTTP request.
    let category = new Category();
    //category.id is left undefined
    category.name = this.category_input_name;
    this.entryService.addCategory(category).then(
      data => {console.log("addCategory() called; category object:",category.id+" , "+category.name);
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
      data => {console.log("Category deleted. id:"+id);
              //Calling on getCategories() to display the updated list.
              this.getCategories();},
      error =>{console.log("Issue while deleting a category.");}
    );    
  }

  foldUnfoldCategory(category_id:number){    
    console.log("Looking for element with id:"+"itemsForCategory"+category_id)
    let toggledElement = document.getElementById("itemsForCategory"+category_id);    
    if (toggledElement.style.getPropertyValue('visibility')=='hidden'){
      this.unfoldCategory(category_id);
    }
    else{
      this.foldCategory(category_id);
    }
    //Query to get all the items, to group them by category id and to affect the value of items_sorted_by_category
    this.get_items_for_category_id(category_id);    
  }

  unfoldCategory(category_id:number)
  {
    let toggledElement = document.getElementById("itemsForCategory"+category_id);
    toggledElement.style.setProperty('visibility',"visible");
    toggledElement.style.setProperty("display","block");
  }

  foldCategory(category_id:number){
    let toggledElement = document.getElementById("itemsForCategory"+category_id);
    toggledElement.style.setProperty('visibility',"hidden");
    toggledElement.style.setProperty("display","none");
  }

  addItem(categoryId:number){
    console.log("Add item for the category: "+categoryId);
    let item = new Item();
    item.id=1;//TODO: see if/why that's an issue to leave the id undefined.
    item.name = this.item_input_name;
    item.categoryId = categoryId;
    this.entryService.addItem(item, categoryId).then(
      data => {console.log("Item Added to category id: "+categoryId);},
      error => {console.log("Error while adding an item: ",error);}
    )
    //TODO: update the list of items and display them if the list was not displayed
    this.get_items_for_category_id(categoryId);
    /*
    let toggledElement = document.getElementById("items"+categoryId);    
    if (toggledElement.style.getPropertyValue('visibility')=='hidden'){
      this.unfoldCategory(categoryId);
    }
    */


  }
//Variable numbers of categories. Gettting all items at once. Then sorting them by category id.
  get_items_for_category_id(category_id:number){
    //re-initializing the item list
    this.items_sorted_by_category = new Map();
    this.items_for_a_specific_category = [];    
    
    let goal = "the list of items.";
    this.entryService.getItems().then(      
      (data) => {this.all_items=data; console.log("Getting "+goal);}, 
      (error) => {console.log("Error getting "+goal);}
    );
    console.log("Item list:"+this.all_items);
    //Sorting by category id  and storing the items in separated arrays.
    this.all_items.forEach(item => 
      {
        if (this.items_sorted_by_category.has(item.categoryId)){
          let items_for_this_category = this.items_sorted_by_category.get(item.categoryId);
          //Getting the array of items already existing for item.categoryId
          (this.items_sorted_by_category.get(item.categoryId)).push(item);   

        }
        else{
          //Creating a new structure, and adding 
          let items_for_one_category:Array<Item> = [];
          items_for_one_category.push(item);
          (this.items_sorted_by_category).set(item.categoryId,items_for_one_category);
        }      
      });
    //After all the elements have been sorted, the value of items_for_a_specific_category is being assigned.
    this.items_for_a_specific_category = (this.items_sorted_by_category).get(category_id);
  }
}

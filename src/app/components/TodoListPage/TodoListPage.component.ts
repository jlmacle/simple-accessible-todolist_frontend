import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {Router} from '@angular/router';
import { Item } from 'src/app/models/item';
import {Category} from '../../models/category';
import {EntryService} from '../../services/entry.service';

@Component({
  selector: 'app-TodoListPage',
  templateUrl: './TodoListPage.component.html',
  styleUrls: ['./TodoListPage.component.css']
})

export class ToDoListPageComponent implements OnInit, OnChanges {

  constructor(private entryService:EntryService, private router:Router) { }
  
  //used to define a new category
  category_input_name="";
  //used to define a new item
  selected_category_id=1;    
  item_input_name="";

  //used to display existing categories and items
  categories:Array<Category>;
  all_items:Array<Item>=[];  
  items_sorted_by_category = new Map();
  

  ngOnInit(): void {
    this.getCategories();
    this.getItems();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.getItems();    
  }
  

  addCategory(){
    //Creating a category object that will be later on translated to JSON and transmitted in an HTTP request.
    let category = new Category();
    //category.id is left undefined
    category.name = this.category_input_name;
    if (this.category_input_name != "")
    {
      this.entryService.addCategory(category).then(
        data => {console.log("addCategory() called; category object:",category.id+" , "+category.name);
                this.getCategories();},
        error => {console.log("Issue while adding a category.");}      
      );
    }
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
    let toggledElement = document.getElementById("itemsForCategory"+category_id);    
    if (toggledElement.style.getPropertyValue('visibility')=='hidden'){
      this.unfoldCategory(category_id);
    }
    else{
      this.foldCategory(category_id);
    }    
    
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
    item.id=1;//weakness in the code/understanding.
    item.name = this.item_input_name;
    item.categoryId = categoryId;
    if (item.name != ""){
      this.entryService.addItem(item, categoryId).then(
        data => {
          console.log("Item Added to category id: "+categoryId);
          this.getItems();
          this.router.navigate(['.']);
          this.item_input_name = '';   
      },
        error => {console.log("Error while adding an item: ",error);}
      );
    }
  }

  getItems(){
    let goal = "the list of items.";
    this.entryService.getItems().then(      
      (data) => {
        this.all_items=data;console.log("Getting the list of items:");
        console.log("Get items: Display of the list of items. Found: "+this.all_items.length);
        this.all_items.forEach(element => {
          console.log("Element in the list", "id: "+element.id, "name: "+element.name, "categoryId: "+element.categoryId);      
        });
         //Sorting by category id  and storing the items in separated arrays.
        this.items_sorted_by_category = new Map();
        this.all_items.forEach(item => 
          {
            if (this.items_sorted_by_category.has(item.categoryId)){
              //let items_for_this_category = this.items_sorted_by_category.get(item.categoryId);
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
          console.log("this.items_sorted_by_category",this.items_sorted_by_category);


    
    }, 
      (error) => {console.log("Error getting "+goal)+" : "+error}
    );
   
  }

  deleteItem(item_id:number, category_id:number){
    this.entryService.deleteItem(item_id).then(
      data => {console.log("Item deleted. id:"+item_id);
              //Calling on getItems() to display the updated list.
              this.getItems();
              this.unfoldCategory(category_id);
            },
      error =>{console.log("Issue while deleting a category.");}
    );    
  }

}

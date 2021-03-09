import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {Router} from '@angular/router';
import { VirtualTimeScheduler } from 'rxjs';
import { Item } from 'src/app/models/item';
import {Category} from '../../models/category';
import {EntryService} from '../../services/entry.service';

@Component({
  selector: 'app-TodoListPage',
  templateUrl: './TodoListPage.component.html',
  styleUrls: ['./TodoListPage.component.css']
})

export class ToDoListPageComponent implements OnInit, OnChanges 
{

  constructor(private entryService:EntryService, private router:Router) { }
  
  //used to define a new category
  category_input_name="";

  //used to define a new item
  selected_category_id=1;    
  item_input_name="";

  //used to display existing categories and items
  categories:Array<Category>;
  map_category_nextCategory:Map<Category,Category>;
  all_items:Array<Item>=[];  
  items_sorted_by_category = new Map();

  //select states
  previously_selected_id = 0;

  ngOnInit(): void 
  {
    this.getCategories();
    this.getItems();
  }
  
  ngOnChanges(changes: SimpleChanges): void 
  {
    this.getItems();    
    this.createCategoryMap();
    
  }
  

  addCategory()
  {
    //Creating a category object that will be later on translated to JSON and transmitted in an HTTP request.
    let category = new Category();
    //category.id is left undefined
    category.name = this.category_input_name;
    if (this.category_input_name != "")
    {
      this.entryService.addCategory(category).then(
        data => {console.log("addCategory() called; category object:",data.id+" , "+data.name);
                this.getCategories();
                this.category_input_name="";},
        error => {console.log("Issue while adding a category:",error);}      
      );
    }
  }

  getCategories()
  {
    this.entryService.getCategories().then(
      data => {
                this.categories  = data; 
                console.log("Getting the categories from the promise.");
                this.createCategoryMap();
                console.log("Category map created.");
              },
      error => {console.log("Issue with getting the categories from the promise: ", error);}
    )
  }

  createCategoryMap()
  {
    this.map_category_nextCategory = new Map<Category,Category>();
    let categoryArray:Array<Category>=new Array<Category>();
    let index:number=0;
    this.categories.forEach(category =>
      {
        categoryArray.push(category);           
      });
      for(let i=0;i<categoryArray.length;i++)
        {
          if ( i<(categoryArray.length-1) ){this.map_category_nextCategory.set(categoryArray[i], categoryArray[i+1]);} 
          else {this.map_category_nextCategory.set(categoryArray[i],categoryArray[0]);}
          index++;
        };      
      
      console.log("this.map_category_nextCategory: ",this.map_category_nextCategory);
  }

  deleteCategory(id:number)
  {
    this.entryService.deleteCategory(id).then(
      data => {console.log("Category deleted. id:"+id);
              //Calling on getCategories() to display the updated list.
              this.getCategories();},
      error =>{console.log("Issue while deleting a category: ", error);}
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
    let iconForTogglingElement = document.getElementById("plus_sign"+category_id);  
    iconForTogglingElement.setAttribute("aria-expanded","true");    
  }

  foldCategory(category_id:number){
    let toggledElement = document.getElementById("itemsForCategory"+category_id);
    toggledElement.style.setProperty('visibility',"hidden");
    toggledElement.style.setProperty("display","none");
    let iconForTogglingElement = document.getElementById("plus_sign"+category_id);   
    iconForTogglingElement.setAttribute("aria-expanded","false");
  }

  setAriaExpandedToTrue(elementId){
    let element = document.getElementById(elementId);
    element.setAttribute("aria-expanded","true");
  }

  setAriaExpandedTFalse(elementId){
    let element = document.getElementById(elementId);
    element.setAttribute("aria-expanded","false");
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
          this.setAriaExpandedToTrue("plus_sign"+categoryId);         
          this.getItems();
          this.router.navigate(['.']);
          this.item_input_name = '';   
          //resetting default category to Uncategorized
          this.selected_category_id=1;
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
      error =>{console.log("Issue while deleting a category: ", error);}
    );    
  }

  mark_selected(selected_category_id:number)
  {
    console.log("mark_selected");
    let optionElem = document.getElementById("category"+this.previously_selected_id);
    optionElem.setAttribute("aria-selected", "false");
    optionElem = document.getElementById("category"+selected_category_id);
    optionElem.setAttribute("aria-selected","true");
    let selectElem = document.getElementById("category-to-select-field");
    selectElem.setAttribute("aria-activedescendant",'"'+selected_category_id+'"');
    this.previously_selected_id = selected_category_id;
  }

 
  

}

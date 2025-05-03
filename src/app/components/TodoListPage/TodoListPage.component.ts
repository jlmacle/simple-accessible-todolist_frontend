import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import {Item} from 'src/app/models/item';
import {Category} from '../../models/category';
import {EntryService} from '../../services/entry.service';

@Component({
  selector: 'app-todo-list-page',
  // 'HTML elements in your template that match this selector become instances of the component.'
  // https://angular.io/guide/what-is-angular#components
  templateUrl: './TodoListPage.component.html',
  // 'An HTML template that instructs Angular how to render the component.'
  // https://angular.io/guide/what-is-angular#components
  styleUrls: ['./TodoListPage.component.css'],
  // 'optional set of CSS styles that define the appearance of the template's HTML elements'
  // https://angular.io/guide/what-is-angular#components
})

export class TodoListPageComponent implements OnInit, OnChanges {	// code that drives the component behavior
  // https://angular.io/guide/what-is-angular#components

  constructor(private entryService: EntryService, private router: Router) { }

  // Used to define a new category
  categoryInputName = '';

  // Used to define a new item
  selectedCategoryId = 1;
  itemInputName = '';

  // Used to display existing categories and items
  categories: Array<Category>;
  mapCategoryNextCategory: Map<Category, Category>;
  allItems: Array<Item> = [];
  itemsSortedByCategory = new Map();

  // Select states
  previouslySelectedId = 0;

  ngOnInit(): void {
    this.getCategories();
    this.getItems();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getItems();
    this.createCategoryMap();
  }


  addCategory(): void {
    // Creating a category object that will be later on translated to JSON and transmitted in an HTTP request.
    const category = new Category();
    // category.id is left undefined
    category.name = this.categoryInputName;
    if (this.categoryInputName !== '') {
      this.entryService.addCategory(category).then(
          (data) => {
            console.log('addCategory() called; category object:', data.id + ' , ' + data.name);
            this.getCategories();
            this.categoryInputName = '';
          },
          (error) => {
            console.log('ssue while adding a category:', error);
          },
      );
    }
  }

  getCategories(): void {
    this.entryService.getCategories().then(
        (data) => {
          this.categories = data;
          console.log('Getting the categories from the promise.');
          this.createCategoryMap();
          console.log('Category map created.');
        },
        (error) => {
          console.log('Issue with getting the categories from the promise: ', error);
        },
    );
  }

  createCategoryMap(): void {
    this.mapCategoryNextCategory = new Map<Category, Category>();
    const categoryArray: Array<Category> = new Array<Category>();
    let index = 0;
    this.categories.forEach((category) => {
      categoryArray.push(category);
    });
    for (let i = 0; i < categoryArray.length; i++) {
      if ( i < (categoryArray.length - 1) ) {
        this.mapCategoryNextCategory.set(categoryArray[i], categoryArray[i + 1]);
      } else {
        this.mapCategoryNextCategory.set(categoryArray[i], categoryArray[0]);
      }
      index++;
    }

    console.log('this.mapCategoryNextCategory: ', this.mapCategoryNextCategory);
  }

  deleteCategory(id: number): void {
    this.entryService.deleteCategory(id).then(
        (data) => {
          console.log('Category deleted. id:' + id);
          // Calling on getCategories() to display the updated list.
          this.getCategories();
        },
        (error) => {
          console.log('Issue while deleting a category: ', error);
        },
    );
  }

  foldUnfoldCategory(categoryId: number): void {
    const toggledElement = document.getElementById('itemsForCategory' + categoryId);
    if (toggledElement.style.getPropertyValue('visibility') === 'hidden') {
      this.unfoldCategory(categoryId);
    } else {
      this.foldCategory(categoryId);
    }
  }


  unfoldCategory(categoryId: number): void {
    const toggledElement = document.getElementById('itemsForCategory' + categoryId);
    toggledElement.style.setProperty('visibility', 'visible');
    toggledElement.style.setProperty('display', 'block');
    const iconForTogglingElement = document.getElementById('plus_sign' + categoryId);
    iconForTogglingElement.setAttribute('aria-expanded', 'true');
  }

  foldCategory(categoryId: number): void {
    const toggledElement = document.getElementById('itemsForCategory' + categoryId);
    toggledElement.style.setProperty('visibility', 'hidden');
    toggledElement.style.setProperty('display', 'none');
    const iconForTogglingElement = document.getElementById('plus_sign' + categoryId);
    iconForTogglingElement.setAttribute('aria-expanded', 'false');
  }

  setAriaExpandedToTrue(elementId): void {
    const element = document.getElementById(elementId);
    element.setAttribute('aria-expanded', 'true');
  }

  setAriaExpandedTFalse(elementId): void {
    const element = document.getElementById(elementId);
    element.setAttribute('aria-expanded', 'false');
  }

  addItem(categoryId: number): void {
    console.log('Add item for the category: ' + categoryId);
    const item = new Item();
    item.id = 1; // Weakness in the code/understanding.
    item.name = this.itemInputName;
    item.categoryId = categoryId;
    if (item.name !== '') {
      this.entryService.addItem(item, categoryId).then(
          (data) => {
            console.log('Item Added to category id: ' + categoryId);
            this.setAriaExpandedToTrue('plus_sign' + categoryId);
            this.getItems();
            this.router.navigate(['.']);
            this.itemInputName = '';
            // Resetting default category to Uncategorized
            this.selectedCategoryId = 1;
          },
          (error) => {
            console.log('Error while adding an item: ', error);
          },
      );
    }
  }

  getItems(): void {
    
    this.entryService.getItems().then(
        (data) => {
          this.allItems = data; console.log('Getting the list of items:');
          console.log('Get items: Display of the list of items. Found: ' + this.allItems.length);
          this.allItems.forEach((element) => {
            console.log('Element in the list', 'id: ' + element.id, 'name: ' + element.name, 'categoryId: ' + element.categoryId);
          });
          // Sorting by category id  and storing the items in separated arrays.
          this.itemsSortedByCategory = new Map();
          this.allItems.forEach((item) => {
            if (this.itemsSortedByCategory.has(item.categoryId)) {
              // Getting the array of items already existing for item.categoryId
              (this.itemsSortedByCategory.get(item.categoryId)).push(item);
            } else {
              // Creating a new structure, and adding
              const itemsForOneCategory: Array<Item> = [];
              itemsForOneCategory.push(item);
              (this.itemsSortedByCategory).set(item.categoryId, itemsForOneCategory);
            }
          });
          console.log('this.itemsSortedByCategory', this.itemsSortedByCategory);
        },
        (error) => { console.log('Error getting the list of items :'+ error); },
    );
  }

  deleteItem(itemId: number, categoryId: number): void {
    this.entryService.deleteItem(itemId).then(
        (data) => {
          console.log('Item deleted. id:' + itemId);
          // Calling on getItems() to display the updated list.
          this.getItems();
          this.unfoldCategory(categoryId);
        },
        (error) => {
          console.log('Issue while deleting a category: ', error);
        },
    );
  }

  mark_selected(selectedCategoryId: number): void {
    console.log('mark_selected');
    let optionElem = document.getElementById('category' + this.previouslySelectedId);
    optionElem.setAttribute('aria-selected', 'false');
    optionElem = document.getElementById('category' + selectedCategoryId);
    optionElem.setAttribute('aria-selected', 'true');
    const selectElem = document.getElementById('category-to-select-field');
    selectElem.setAttribute('aria-activedescendant', '+selectedCategoryId+');
    this.previouslySelectedId = selectedCategoryId;
  }
}

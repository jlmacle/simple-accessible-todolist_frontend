import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  constructor(private categoryService:CategoryService) { }

  ngOnInit(): void {
  }

  addCategory(){
    
  }

}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Category} from '../models/category';
import {Variables} from '../../environments/variables';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  addCategory(category:Category){
    this.http.post(Variables.base_url+"/category", category);
  }


}

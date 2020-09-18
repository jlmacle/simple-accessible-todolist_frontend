import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Category} from '../models/category';
import {Variables} from '../../environments/variables';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  addCategory(category:Category):Promise<any>{
    console.log("HTTP POST to: "+Variables.base_url+"/category");
    return this.http.post(Variables.base_url+"/category",category).toPromise();
    
  }

  getCategories():Promise<any>{
    return this.http.get(Variables.base_url+"/categories").toPromise();
  }

  deleteCategory(id:number){
    this.http.delete(Variables.base_url+"/categories/"+id);
    console.log("HTTP DELETE to: "+Variables.base_url+"/categories/"+id);
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Category} from '../models/category';
import {Item} from '../models/item';
import {Variables} from '../../environments/variables';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  constructor(private http:HttpClient) { }

  addCategory(category:Category):Promise<any>{
    let url = Variables.base_url+"/category";
    console.log("HTTP POST to: "+url);
    return this.http.post(url,category).toPromise();    
  }

  getCategories():Promise<any>{
    return this.http.get(Variables.base_url+"/categories").toPromise();
  }
    
  deleteCategory(id:number):Promise<any>{
    let url = Variables.base_url+"/category/"+id;
    console.log("HTTP DELETE to: "+url);
    return this.http.delete(url).toPromise();    
  }

  
  addItem(item:Item,categoryId:number):Promise<any>{
    let url = Variables.base_url+"/item/"+categoryId;
    console.log("HTTP POST to: "+url);
    console.log("Item data: Item id:"+item.id+", item name: "+item.name+", item category id"+categoryId);
    return this.http.post(url,item).toPromise();
  }

  getItems():Promise<any>{
    let url = Variables.base_url+"/items";
    console.log("HTTP GET to: "+url);
    return this.http.get(url).toPromise();
  }

  deleteItem(id:number):Promise<any>{
    let url = Variables.base_url+"/item/"+id;
    console.log("HTTP DELETE to: "+url);
    return this.http.delete(url).toPromise();    
  }
  

}

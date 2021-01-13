import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {Routes} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToDoListPageComponent } from './components/TodoListPage/TodoListPage.component';
//imports used while using mat-form-field
import  {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const routes: Routes =[
  {path: '.', component:ToDoListPageComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ToDoListPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    BrowserAnimationsModule
    
  ],
    
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}

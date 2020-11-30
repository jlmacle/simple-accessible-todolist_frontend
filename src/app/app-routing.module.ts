import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToDoListPageComponent } from "./components/TodoListPage/TodoListPage.component";

const routes: Routes = [
  {path:'',component:ToDoListPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

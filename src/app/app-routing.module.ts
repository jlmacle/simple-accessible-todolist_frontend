import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TodoListPageComponent} from './components/TodoListPage/TodoListPage.component';

// In-app navigation: routing to views
// https://angular.io/guide/router#in-app-navigation-routing-to-views

const routes: Routes = [
  {path: '', component: TodoListPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

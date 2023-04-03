import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ArticlesManagerComponent} from "./articles-manager.component";
import {AddEditArticleComponent} from "./add-edit-article/add-edit-article.component";

const routes: Routes = [
  {path : '', component: ArticlesManagerComponent},
  {path : 'add', component: AddEditArticleComponent},
  {path : 'edit/:id', component: AddEditArticleComponent},
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ArticlesManagerRoutingModule { }

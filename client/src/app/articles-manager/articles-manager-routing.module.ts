import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ArticlesManagerComponent} from "./articles-manager.component";
import {AddEditArticleComponent} from "./add-edit-article/add-edit-article.component";
import {AddArticleComponent} from "./add-article/add-article.component";

const routes: Routes = [
  {path : '', component: ArticlesManagerComponent},
  {path : 'article', component: AddEditArticleComponent},
  {path : 'add-article', component: AddArticleComponent},
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ArticlesManagerRoutingModule { }

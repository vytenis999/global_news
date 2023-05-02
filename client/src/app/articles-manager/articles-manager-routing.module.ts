import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ArticlesManagerComponent} from "./articles-manager.component";
import {AddArticleComponent} from "./add-article/add-article.component";
import {EditArticleComponent} from "./edit-article/edit-article.component";

const routes: Routes = [
  {path : '', component: ArticlesManagerComponent},
  {path : 'edit-article', component: EditArticleComponent},
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

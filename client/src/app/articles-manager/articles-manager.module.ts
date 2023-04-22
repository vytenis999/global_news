import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditArticleComponent } from './add-edit-article/add-edit-article.component';
import { ArticlesManagerComponent } from './articles-manager.component';
import {ArticlesManagerRoutingModule} from "./articles-manager-routing.module";
import {SharedModule} from "../shared/shared.module";
import {CategoryModule} from "../category/category.module";
import { AddArticleComponent } from './add-article/add-article.component';
import { EditArticleComponent } from './edit-article/edit-article.component';



@NgModule({
  declarations: [
    AddEditArticleComponent,
    ArticlesManagerComponent,
    AddArticleComponent,
    EditArticleComponent,
  ],
  imports: [
    CommonModule,
    ArticlesManagerRoutingModule,
    SharedModule,
    CategoryModule
  ],
  exports: [ArticlesManagerRoutingModule],
})
export class ArticlesManagerModule { }

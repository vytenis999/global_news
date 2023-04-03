import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditArticleComponent } from './add-edit-article/add-edit-article.component';
import { ArticlesManagerComponent } from './articles-manager.component';
import {ArticlesManagerRoutingModule} from "./articles-manager-routing.module";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    AddEditArticleComponent,
    ArticlesManagerComponent,
  ],
  imports: [
    CommonModule,
    ArticlesManagerRoutingModule,
    SharedModule
  ]
})
export class ArticlesManagerModule { }

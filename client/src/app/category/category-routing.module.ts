import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category.component';
import { ArticleDetailsComponent } from './article-details/article-details.component';

const routes: Routes = [
  { path: '', component: CategoryComponent },
  {
    path: ':id',
    component: ArticleDetailsComponent,
    data: { breadcrumb: { alias: 'articleDetails' } },
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule {}

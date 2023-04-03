import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { ArticleItemComponent } from './article-item/article-item.component';
import { SharedModule } from '../shared/shared.module';
import { CategoryRoutingModule } from './category-routing.module';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';

@NgModule({
  declarations: [CategoryComponent, ArticleItemComponent, ArticleDetailsComponent],
  imports: [CommonModule, SharedModule, CategoryRoutingModule, NgxGalleryModule],
  exports: [ArticleDetailsComponent, CategoryRoutingModule],
})
export class CategoryModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import {CategoryModule} from "../category/category.module";
import { CategoryFeatureComponent } from './category-feature/category-feature.component';

@NgModule({
  declarations: [HomeComponent, CategoryFeatureComponent],
  imports: [CommonModule, CategoryModule, SharedModule],
  exports: [HomeComponent],
})
export class HomeModule {}

import { Component, Input } from '@angular/core';
import { IArticle } from 'src/app/shared/models/article';
import {ICategory} from "../../shared/models/category";
import {CategoryService} from "../category.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.scss'],
})
export class ArticleItemComponent {
  @Input() article: IArticle;
  categories: ICategory[];

  constructor(private categoryService: CategoryService, private route: ActivatedRoute) {}

  ngOnInit(){
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (result) => (this.categories = [...result]),
      error: (e) => console.log(e),
      complete: () => console.info('complete'),
    });
  }

  identifyCategoryId(categoryName: string){
    const pos = this.categories?.map(e => e.name).indexOf(categoryName);
    return pos + 1;
  }
}

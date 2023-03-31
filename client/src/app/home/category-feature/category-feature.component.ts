import {Component, Input} from '@angular/core';
import {IArticle} from "../../shared/models/article";
import {NewsParams} from "../../shared/models/newsParams";
import {CategoryService} from "../../category/category.service";
import {ActivatedRoute} from "@angular/router";
import {ICategory} from "../../shared/models/category";

@Component({
  selector: 'app-category-feature',
  templateUrl: './category-feature.component.html',
  styleUrls: ['./category-feature.component.scss']
})
export class CategoryFeatureComponent {
  @Input() category: ICategory;
  articles: IArticle[] = [];
  newsParams = new NewsParams();
  totalCount: number;

  constructor(private categoryService: CategoryService, private route: ActivatedRoute) {}

  ngOnInit(){
    this.SortedWithCategoryArticles();

  }

  getArticles() {
    this.categoryService.getArticles(this.newsParams).subscribe({
      next: (res) => {
        this.articles = res.data;
        this.newsParams.pageNumber = res.pageIndex;
        this.newsParams.pageSize = res.pageSize;
        this.totalCount = res.count;
      },
      error: (e) => console.log(e),
      complete: () => console.info('complete'),
    });
  }

  SortedWithCategoryArticles() {
    this.newsParams.sort = 'dateDesc';
    this.newsParams.categoryId = this.category.id;
    this.getArticles();
  }

}

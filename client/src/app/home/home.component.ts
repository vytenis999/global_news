import { Component } from '@angular/core';
import {IArticle} from "../shared/models/article";
import {ICategory} from "../shared/models/category";
import {NewsParams} from "../shared/models/newsParams";
import {CategoryService} from "../category/category.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  articles: IArticle[] = [];
  categories: ICategory[];
  newsParams = new NewsParams();
  totalCount: number;

  constructor(private categoryService: CategoryService, private route: ActivatedRoute) {}

  ngOnInit(){
    this.SortedArticles();
    this.getCategories();
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

  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (result) => (this.categories = [...result]),
      error: (e) => console.log(e),
      complete: () => console.info('complete'),
    });
  }

  identifyCategoryId(categoryName: string){
    const pos = this.categories.map(e => e.name).indexOf(categoryName);
    return pos + 1;
  }

  SortedArticles() {
    this.newsParams.sort = 'dateDesc';
    this.getArticles();
  }
}



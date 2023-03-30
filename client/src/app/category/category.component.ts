import { Component, ElementRef, ViewChild } from '@angular/core';
import { IArticle } from '../shared/models/article';
import { CategoryService } from './category.service';
import { ICategory } from '../shared/models/category';
import { NewsParams } from '../shared/models/newsParams';
import { BreadcrumbService } from "xng-breadcrumb";
import {ActivatedRoute, Route} from "@angular/router";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
  @ViewChild('search', { static: false }) searchTerm: ElementRef;
  articles: IArticle[];
  categories: ICategory[];
  newsParams = new NewsParams();
  totalCount: number;
  categoryId: number = 0;
  oldCategoryId: number = 0;
  title: string;

  sortOptions = [
    { name: 'Latest', value: 'dateDesc' },
    { name: 'Oldest', value: 'dateAsc' }
  ];

  constructor(private categoryService: CategoryService, private route: ActivatedRoute) {
    //route.queryParams.subscribe(params => this.categoryId = params['categoryId']);
  }

  ngOnInit() {
    this.getCategories();
    //this.categoryId = +this.route.snapshot.queryParamMap.get('categoryId');
    //this.title = this.route.snapshot.queryParamMap.get('categoryName');
    this.route.queryParamMap
      .subscribe((params) => {
          this.categoryId = +params.get('categoryId');
          this.title = params.get('categoryName');
          this.checkSelectedCategory(this.categoryId);
        }
      );
    console.log(this.categoryId);
    this.checkSelectedCategory(this.categoryId);
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
      next: (result) => (this.categories = [{ id: 0, name: 'All' }, ...result]),
      error: (e) => console.log(e),
      complete: () => console.info('complete'),
    });
  }

  checkSelectedCategory(categoryId: number){
    if (this.categoryId && this.categoryId != 0){
      this.onCategorySelected(this.categoryId);
      this.getCategories();
      this.oldCategoryId = this.categoryId;
    }
    else if(this.categoryId == 0){
      this.newsParams = new NewsParams();
      this.getArticles();
      this.title = 'All';
      this.oldCategoryId = this.categoryId;
    }
    else{
      this.getArticles();
      this.title = 'All';
      this.newsParams = new NewsParams();
      this.oldCategoryId = this.categoryId;
    }
  }

  onCategorySelected(categoryId: number) {
    this.newsParams.categoryId = categoryId;
    this.newsParams.pageNumber = 1;
    this.getArticles();
  }

  onSortSelected(sort: string) {
    this.newsParams.sort = sort;
    this.getArticles();
  }

  onPageChanged(event: any) {
    if (this.newsParams.pageNumber !== event) {
      this.newsParams.pageNumber = event;
      this.getArticles();
    }
  }

  onSearch() {
    this.newsParams.search = this.searchTerm.nativeElement.value;
    this.newsParams.pageNumber = 1;
    this.title = `Search results: ${this.searchTerm.nativeElement.value}`;
    this.getArticles();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.newsParams = new NewsParams();
    this.title = 'All';
    this.getArticles();
  }
}

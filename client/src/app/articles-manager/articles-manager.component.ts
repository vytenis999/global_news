import {Component, ElementRef, ViewChild} from '@angular/core';
import {IArticle} from "../shared/models/article";
import {ICategory} from "../shared/models/category";
import {NewsParams} from "../shared/models/newsParams";
import {CategoryService} from "../category/category.service";
import {ActivatedRoute} from "@angular/router";
import {ToastService} from "../shared/components/toast/toast.service";

@Component({
  selector: 'app-articles-manager',
  templateUrl: './articles-manager.component.html',
  styleUrls: ['./articles-manager.component.scss']
})
export class ArticlesManagerComponent {
  @ViewChild('search', { static: false }) searchTerm: ElementRef;
  articles: IArticle[];
  categories: ICategory[];
  newsParams = new NewsParams();
  totalCount: number;
  categoryId: number = 0;
  oldCategoryId: number = 0;

  sortOptions = [
    { name: 'Latest', value: 'dateDesc' },
    { name: 'Oldest', value: 'dateAsc' }
  ];

  constructor(private categoryService: CategoryService, private route: ActivatedRoute,private toast: ToastService) {}

  ngOnInit() {
    this.getCategories();
    this.getArticles();
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

  onCategorySelected(categoryId: number) {
    if(categoryId == 0){
      this.newsParams = new NewsParams();
      this.getArticles();
    }else {
      this.newsParams.categoryId = categoryId;
      this.newsParams.pageNumber = 1;
      this.getArticles();
    }

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
    this.getArticles();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.newsParams = new NewsParams();
    this.getArticles();
  }

  delete(id: number){
    this.categoryService.deleteArticle(id).subscribe({
      next: (result) => {
          this.toast.initiate({
          title: `Success`,
          content: `Deleted`,
          type: 1,
          }),
          this.getArticles();
      },
      error: (e) => console.log(e),
      complete: () => console.info('complete'),
    });
  }
}

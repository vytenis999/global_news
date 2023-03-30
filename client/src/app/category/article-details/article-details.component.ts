import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IArticle } from 'src/app/shared/models/article';
import { BreadcrumbService } from 'xng-breadcrumb';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss'],
})
export class ArticleDetailsComponent {
  article: IArticle;

  constructor(
    private newsService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private bcService: BreadcrumbService
  ) {
    this.bcService.set('@articleDetails', ' ');
  }

  ngOnInit() {
    this.loadArticle();
  }

  loadArticle() {
    this.newsService
      .getArticle(+this.activatedRoute.snapshot.paramMap.get('id'))
      .subscribe({
        next: (article) => {
          this.article = article;
          this.bcService.set('@articleDetails', article.title);
        },
        error: (e) => console.log(e),
        complete: () => console.info('complete'),
      });
  }
}

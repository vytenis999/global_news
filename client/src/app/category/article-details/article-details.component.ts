import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IArticle } from 'src/app/shared/models/article';
import { BreadcrumbService } from 'xng-breadcrumb';
import { CategoryService } from '../category.service';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss'],
})
export class ArticleDetailsComponent {
  article: IArticle;
  Urls : string[];
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private newsService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private bcService: BreadcrumbService
  ) {}

  ngOnInit() {
    this.loadArticle();
  }

  loadArticle() {
    this.newsService
      .getArticle(+this.activatedRoute.snapshot.paramMap.get('id'))
      .subscribe({
        next: (article) => {
          this.article = article;
          this.Urls = this.article.galleryUrls;
          this.printing();
        },
        error: (e) => console.log(e),
        complete: () => console.info('complete'),
      });
  }

  printing(){
    console.log(this.Urls)

    this.galleryOptions = [
      {
        width: '800px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    this.galleryImages = [];

    for (let i = 0; i < this.article?.galleryUrls?.length; i++){
      this.galleryImages.push({small: this.article.galleryUrls![i], medium: this.article.galleryUrls![i], big : this.article.galleryUrls![i]})
    }
  }
}

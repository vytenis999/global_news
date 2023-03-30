import { Component, Input } from '@angular/core';
import { IArticle } from 'src/app/shared/models/article';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.scss'],
})
export class ArticleItemComponent {
  @Input() article: IArticle;
}

import { Component } from '@angular/core';
import {IArticle} from "../../shared/models/article";

@Component({
  selector: 'app-add-edit-article',
  templateUrl: './add-edit-article.component.html',
  styleUrls: ['./add-edit-article.component.scss']
})
export class AddEditArticleComponent {
  article: IArticle;
  
}

import { Component } from '@angular/core';
import {IArticle} from "../../shared/models/article";
import {CategoryService} from "../../category/category.service";
import {ActivatedRoute} from "@angular/router";
import {BreadcrumbService} from "xng-breadcrumb";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastService} from "../../shared/components/toast/toast.service";
import {getDate} from "ngx-bootstrap/chronos/utils/date-getters";
import {ICategory} from "../../shared/models/category";

@Component({
  selector: 'app-add-edit-article',
  templateUrl: './add-edit-article.component.html',
  styleUrls: ['./add-edit-article.component.scss']
})
export class AddEditArticleComponent {
  article: IArticle;
  categories: ICategory[];
  articleForm: FormGroup;
  submitted = false;
  id?: number;

  constructor(private newsService: CategoryService, private activatedRoute: ActivatedRoute, private fb: FormBuilder, private toast: ToastService) {}

  ngOnInit() {
    this.getCategories();
    this.articleForm = this.fb.group({
      date: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      text: ['', Validators.required],
      picture: ['', Validators.required],
      articleCategory: ['', Validators.required]
    });

    this.activatedRoute.queryParamMap
      .subscribe((params) => {
          this.id = +params.get('articleId');
          console.log(this.id);
        }
      );

    if(this.id != 0){
      this.loadArticle();
    }
  }

  getCategories() {
    this.newsService.getCategories().subscribe({
      next: (result) => (this.categories = [{ id: 0, name: 'All' }, ...result]),
      error: (e) => console.log(e),
      complete: () => console.info('complete'),
    });
  }

  loadArticle() {
    this.newsService
      .getArticle(this.id)
      .subscribe({
        next: (article) => {
          this.article = article;
          this.articleForm.controls['title'].setValue(this.article?.title);
          this.articleForm.controls['description'].setValue(this.article?.description);
          this.articleForm.controls['text'].setValue(this.article?.text);
          this.articleForm.controls['date'].setValue(new Date());
          this.articleForm.controls['articleCategory'].setValue(this.article?.articleCategory)
          console.log();
        },
        error: (e) => console.log(e),
        complete: () => console.info('complete'),
      });
  }

  onCategorySelected(categoryId: string) {
    this.articleForm.controls['articleCategory'].setValue(categoryId);
  }

  onSubmit() {
    this.submitted = true;

    if(this.articleForm.invalid){
      return
    }
    console.log('Your form data : ', this.articleForm.value );
    this.toast.initiate({
      title: `Success`,
      content: `Saved`,
      type: 1,
    });
  }

}

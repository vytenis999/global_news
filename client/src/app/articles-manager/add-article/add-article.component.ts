import { Component } from '@angular/core';
import {IArticle, IArticleAdd} from "../../shared/models/article";
import {ICategory} from "../../shared/models/category";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../category/category.service";
import {ActivatedRoute} from "@angular/router";
import {ToastService} from "../../shared/components/toast/toast.service";
import {FileHandle, FilesSent} from "../../shared/models/file-handle";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent {
  article: IArticleAdd;
  categories: ICategory[];
  articleForm: FormGroup;
  submitted = false;
  id?: number;
  formattedDate: any;
  filesSent: FilesSent;

  selectedFiles: File[] = [];

  constructor(private sanitizer: DomSanitizer,private newsService: CategoryService, private activatedRoute: ActivatedRoute, private fb: FormBuilder, private toast: ToastService) {}

  ngOnInit() {
    this.getCategories();
    this.getDate();
    this.articleForm = this.fb.group({
      date: [this.formattedDate, Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      text: ['', Validators.required],
      articleCategory: ['', Validators.required]
    });
  }

  getDate(){
    const currentDate: Date = new Date();
    const year: number = currentDate.getFullYear();
    const month: number = currentDate.getMonth() + 1; // add 1 since month is zero-indexed
    const day: number = currentDate.getDate();
    this.formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }

  getCategories() {
    this.newsService.getCategories().subscribe({
      next: (result) => (this.categories = [{ id: 0, name: 'Select category' }, ...result]),
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

    console.log(this.selectedFiles);
    this.uploadImages();

    const newArticle: IArticleAdd = {
      date: new Date(this.articleForm.value.date),
      title: this.articleForm.value.title,
      description: this.articleForm.value.description,
      text: this.articleForm.value.text,
      pictureUrl: this.selectedFiles[0].name,
      galleryUrls: this.selectedFiles.map(file => file.name),
      articleCategoryId: this.articleForm.value.articleCategory
    };

    this.newsService.postArticle(newArticle).subscribe({
      next: () => {
      this.toast.initiate({
        title: `Success`,
        content: `Saved`,
        type: 1,
      });
        this.articleForm.reset();
        this.submitted = false;
      },
      error: (e) => console.log(e),
      complete: () => console.info('complete'),
    });
    //console.log('Your form data : ', newArticle);
  }

  onFileSelect(event): void {
    if(event.target.files) {
      const file = event.target.files[0];

      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }

      this.selectedFiles.push(fileHandle.file);
    }
  }

  uploadImages(): void {
    const formData = new FormData();
    for (const file of this.selectedFiles) {
      formData.append('files', file);
    }
    this.newsService.postImages(formData).subscribe({
      next: () => {
        this.toast.initiate({
          title: `Success`,
          content: `Saved`,
          type: 1,
        });
      },
      error: (e) => console.log(e),
      complete: () => console.info('complete upload'),
    });
  }

  /*
  onFileSelected(event){
    if(event.target.files){
      const file = event.target.files[0];

      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }

      this.filesSent?.articlesImages?.push(fileHandle);
    }
  }*/
}

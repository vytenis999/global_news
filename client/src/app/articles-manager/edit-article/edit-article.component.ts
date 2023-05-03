import { Component } from '@angular/core';
import {IArticle, IArticleAdd, IArticleEdit} from "../../shared/models/article";
import {ICategory} from "../../shared/models/category";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FileHandle, FilesSent} from "../../shared/models/file-handle";
import {ActivatedRoute, Router} from "@angular/router";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {CategoryService} from "../../category/category.service";
import {ToastService} from "../../shared/components/toast/toast.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent {
  article: IArticleEdit;
  categories: ICategory[];
  articleForm: FormGroup;
  submitted = false;
  id?: number;
  formattedDate: any;
  filesSent: FilesSent = {
    articlesImages: []
  };

  myArray: string[] = ["politics1.png", "politics2.png"];

  selectedOption: number;
  selectedFiles: File[] = [];
  imagesToDelete: string[] = [];
  imagesExist: string[] = [];
  ImagesToUpload: File[] = [];

  constructor(private http: HttpClient, private router: Router, private sanitizer: DomSanitizer,private newsService: CategoryService, private activatedRoute: ActivatedRoute, private fb: FormBuilder, private toast: ToastService) {}

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

  loadArticle() {
    this.newsService
      .getArticle(this.id)
      .subscribe({
        next: (article) => {
          //this.article = article;
          this.articleForm.controls['title'].setValue(article?.title);
          this.articleForm.controls['description'].setValue(article?.description);
          this.articleForm.controls['text'].setValue(article?.text);
          this.articleForm.controls['date'].setValue(new Date());
          this.articleForm.controls['articleCategory'].setValue(3)
          this.imagesExist = article?.galleryUrls;
          //this.selectedOption = this.article?.articleCategory;
          this.selectedOption = 3;
          //this.uploadFilesFromStrings(this.myArray)
          this.downloadImages(article);
        },
        error: (e) => console.log(e),
        complete: () => console.info('complete'),
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

    this.selectedFiles = this.filesSent.articlesImages.map(fileHandle => fileHandle.file);

    //this.selectedFiles = this.selectedFiles.filter(file => console.log(file.name));

    //this.ImagesToUpload = this.selectedFiles.filter(file => !this.imagesExist.includes(file.name));

    this.deleteFiles();

    //this.uploadImages();

    const newArticle: IArticleEdit = {
      id: this.id,
      date: new Date(this.articleForm.value.date),
      title: this.articleForm.value.title,
      description: this.articleForm.value.description,
      text: this.articleForm.value.text,
      pictureUrl: this.selectedFiles[0]?.name,
      galleryUrls: this.selectedFiles.map(file => file.name),
      articleCategoryId: this.articleForm.value.articleCategory.toString()
    };

    this.newsService.editArticle(newArticle).subscribe({
      next: () => {
        this.toast.initiate({
          title: `Success`,
          content: `Saved`,
          type: 1,
        });
        this.articleForm.reset();
        this.submitted = false;
        this.router.navigateByUrl('/articles-manager')
      },
      error: (e) => console.log(e),
      complete: () => console.info('complete'),
    });
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
      this.filesSent.articlesImages.push(fileHandle);
    }
  }

  downloadImages(article : IArticle) {
    for (let i = 0; i < article?.galleryUrls.length; i++) {
      const link = article?.galleryUrls[i];
      this.http.get(link, { responseType: 'blob' }).subscribe(blob => {
        const fileName = this.getFileName(link);
        const url = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
        const fileHandle: FileHandle = { file: new File([blob], fileName), url };
        this.filesSent.articlesImages.push(fileHandle);
      });
    }
  }

  private getFileName(link: string): string {
    const splitLink = link.split('/');
    return splitLink[splitLink.length - 1];
  }

  removeImage(i: number){
    const removedFile = this.filesSent.articlesImages[i];
    this.filesSent.articlesImages.splice(i, 1);
    this.imagesToDelete.push(removedFile.file.name);
  }

  uploadImages(): void {
    const formData = new FormData();
    for (const file of this.ImagesToUpload) {
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

  deleteFiles(){
    this.newsService.deleteImages(this.imagesToDelete).subscribe({
      next: () => {
        this.toast.initiate({
          title: `Success`,
          content: `Saved`,
          type: 1,
        });
      },
      error: (e) => console.log(e),
      complete: () => console.info('complete delete'),
    });
  }

}

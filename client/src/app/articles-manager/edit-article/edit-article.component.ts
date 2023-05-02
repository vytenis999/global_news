import { Component } from '@angular/core';
import {IArticle, IArticleAdd} from "../../shared/models/article";
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
  article: IArticle;
  categories: ICategory[];
  articleForm: FormGroup;
  submitted = false;
  id?: number;
  formattedDate: any;
  filesSent: FilesSent = {
    articlesImages: []
  };

  myArray: string[] = ["politics1.png", "politics2.png"];

  selectedOption: any;
  selectedFiles: File[] = [];

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
          this.article = article;
          this.articleForm.controls['title'].setValue(this.article?.title);
          this.articleForm.controls['description'].setValue(this.article?.description);
          this.articleForm.controls['text'].setValue(this.article?.text);
          this.articleForm.controls['date'].setValue(new Date());
          this.articleForm.controls['articleCategory'].setValue(this.article?.articleCategory)
          this.selectedOption = this.article?.articleCategory;
          //this.uploadFilesFromStrings(this.myArray)
          this.downloadImages();
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
        this.router.navigateByUrl('/articles-manager')
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
      this.filesSent.articlesImages.push(fileHandle);
      //this.selectedFiles.push(fileHandle.file);
    }
  }

  downloadImages() {
    for (let i = 0; i < this.article.galleryUrls.length; i++) {
      const link = this.article.galleryUrls[i];
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

  uploadFilesFromStrings(stringsWithLinks: string[]): void {


    /*
    this.newsService.getImages(stringsWithLinks)
      .subscribe(
        (res) => {
          console.log(res)
          res.forEach(fileObj => {
            const file: File = new File([fileObj.data], fileObj.fileName, { type: fileObj.contentType });
            const fileHandle: FileHandle = {
              file: file,
              url: this.sanitizer.bypassSecurityTrustUrl(
                window.URL.createObjectURL(file)
              )
            }
            this.filesSent.articlesImages.push(fileHandle);
          });
        },
        (error: any) => {
          console.error(error);
          // display error message to user
        }
      );*/
  }

  removeImage(i: number){
    this.filesSent.articlesImages.splice(i, 1);
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

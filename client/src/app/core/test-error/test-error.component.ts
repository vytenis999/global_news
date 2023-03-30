import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss'],
})
export class TestErrorComponent {
  baseUrl = environment.apiUrl;
  validationErrors: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  get404Error() {
    this.http.get(this.baseUrl + 'products/42').subscribe({
      next: (res) => console.log(res),
      error: (e) => console.log(e),
      complete: () => console.info('complete'),
    });
  }
  get500Error() {
    this.http.get(this.baseUrl + 'buggy/servererror').subscribe({
      next: (res) => console.log(res),
      error: (e) => console.log(e),
      complete: () => console.info('complete'),
    });
  }
  get400Error() {
    this.http.get(this.baseUrl + 'buggy/badrequest').subscribe({
      next: (res) => console.log(res),
      error: (e) => console.log(e),
      complete: () => console.info('complete'),
    });
  }
  get400ValidationError() {
    this.http.get(this.baseUrl + 'products/fortytwo').subscribe({
      next: (res) => console.log(res),
      error: (e) => {
        console.log(e);
        this.validationErrors = e.errors;
      },
      complete: () => console.info('complete'),
    });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPagination } from '../shared/models/pagination';
import { ICategory } from '../shared/models/category';
import { map } from 'rxjs';
import { NewsParams } from '../shared/models/newsParams';
import { IArticle } from '../shared/models/article';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) {}

  getArticles(newsParams: NewsParams) {
    let params = new HttpParams();

    if (newsParams.categoryId !== 0) {
      params = params.append('categoryId', newsParams.categoryId.toString());
    }

    if (newsParams.search) {
      params = params.append('search', newsParams.search);
    }

    params = params.append('sort', newsParams.sort);
    params = params.append('pageIndex', newsParams.pageNumber.toString());
    params = params.append('pageIndex', newsParams.pageSize.toString());

    return this.http
      .get<IPagination>(this.baseUrl + 'articles', {
        observe: 'response',
        params,
      })
      .pipe(
        map((response) => {
          return response.body;
        })
      );
  }

  getArticle(id: number) {
    return this.http.get<IArticle>(this.baseUrl + 'articles/' + id);
  }

  getCategories() {
    return this.http.get<ICategory[]>(this.baseUrl + 'articles/categories');
  }

}

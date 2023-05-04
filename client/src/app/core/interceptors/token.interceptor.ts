import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private excludeUrls: string[] = ['https://api.openweathermap.org', 'https://nominatim.openstreetmap.org'];

  private addTokenToHeader(request: HttpRequest<any>): HttpRequest<any> {
    const token = localStorage.getItem('token');
    if (token && !this.shouldExclude(request.url)) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    } else {
      return request;
    }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    request = this.addTokenToHeader(request);
    return next.handle(request);
  }

  private shouldExclude(url: string): boolean {
    return this.excludeUrls.some(excludedUrl => url.includes(excludedUrl));
  }

}

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private addTokenToHeader(request: HttpRequest<any>): HttpRequest<any> {
    const token = localStorage.getItem('token');
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    request = this.addTokenToHeader(request);
    return next.handle(request);
  }

}

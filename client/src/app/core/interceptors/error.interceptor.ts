import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastService } from 'src/app/shared/components/toast/toast.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toast: ToastService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error) {
          if (error.status == 400) {
            if (error.error.errors) {
              throw error.error;
            } else {
              this.toast.initiate({
                title: `${error.error.statusCode.toString()}`,
                content: `${error.error.message}`,
              });
            }
          }
          if (error.status == 401) {
            this.toast.initiate({
              title: `${error.error.statusCode.toString()}`,
              content: `${error.error.message}`,
            });
          }
          if (error.status == 404) {
            this.router.navigateByUrl('/not-found');
          }
          if (error.status == 500) {
            const navigationExtras: NavigationExtras = {
              state: { error: error.error },
            };
            this.router.navigateByUrl('/server-error', navigationExtras);
          }
        }
        return throwError(error);
      })
    );
  }
}

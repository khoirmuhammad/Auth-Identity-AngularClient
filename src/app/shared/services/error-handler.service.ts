import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    debugger;
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          debugger;
          let errorMessage = this.handleError(error);
          return throwError(() => new Error(errorMessage));
        })
      )
  }

  private handleError = (error: HttpErrorResponse): string => {
    if (error.status === 404) {
      return this.handleNotFound(error);
    } else if (error.status === 400) {
      return this.handleBadRequest(error);
    } else {
      return error.error ? error.error : error.message;
    }
  }

  private handleNotFound = (error: HttpErrorResponse): string => {
    this.router.navigate(['/404']);
    return error.message;
  }

  private handleBadRequest = (error: HttpErrorResponse): string => {

    let message = '';

    if (error.error.errorMessages !== undefined) {
      const errorMessages = Object.values(error.error.errorMessages);

      errorMessages.map((m) => {
        message += m + '<br>';
      });

      return message.slice(0, -4);

    }

    if (error.error.errors.ConfirmPassword !== undefined) {
      const errorPassword = Object.values(error.error.errors.ConfirmPassword);

      errorPassword.map((m) => {
        message += m + '<br>';
      });
      return message.slice(0, -4);

    }

    return error.error ? error.error : error.message;

  }

}

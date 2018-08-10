import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'node_modules/ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private toastr: ToastrService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


        return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {

            switch (err.status) {
                case 401:
                    this.toastr.error(err.error.message, 'Unathorized');
                    break;
                case 400:
                    const message = Object.keys(err.error.errors)
                        .map(x => err.error.errors[x])
                        .join('\n');
                    this.toastr.error(message, 'Something went wrong');
                    break;
            }

            return throwError(err);
        }));
    }

}
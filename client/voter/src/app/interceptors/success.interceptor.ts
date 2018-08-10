import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SuccessInterceptor implements HttpInterceptor {
    constructor(private toastr: ToastrService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        return next.handle(req)
            .pipe(tap((res) => {
                if(res instanceof HttpResponse) {
                    console.log('Success');
                    console.log(res);
                    this.toastr.success(res['body']['message'], 'Success');
                }
            }));
    } 
}
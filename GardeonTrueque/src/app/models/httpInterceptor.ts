import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@Injectable()
export class EmptyResponseBodyErrorInterceptor implements HttpInterceptor {
    constructor() { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.responseType === 'json') {
            req = req.clone({ responseType: 'text' });

            return next.handle(req).pipe(map(response => {
                if (response instanceof HttpResponse) {
                    response = response.clone<any>({ body: JSON.parse(response.body) });
                }

                return response;
            }));
        }

        return next.handle(req);
    }
}

@NgModule({
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: EmptyResponseBodyErrorInterceptor, multi: true }
    ]
})
export class HttpInterceptorModule { }

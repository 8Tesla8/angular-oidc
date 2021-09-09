import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private readonly _authService: AuthenticationService,
        private readonly _router: Router
    ) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

            const accessToken = this._authService.getAccessToken();
            const headers = req.headers.set(
                'Authorization',
                `Bearer ${accessToken}`
            );
            const authReq = req.clone({ headers });

            return next.handle(authReq).pipe(
                tap(
                    () => {},
                    error => {
                        const respError = error as HttpErrorResponse;
                        if (
                            respError &&
                            (respError.status === 401 ||
                                respError.status === 403)
                        ) {
                            debugger;
                            this._router.navigate(['/unauthorized']);
                        }
                    }
                )
            );
    }
}

import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, AuthUrlConstantServiceToken, IAuthUrlConstantService } from '../services';


@Component({
    selector: 'login-callback',
    template: ''
})
export class LoginCallbackComponent implements OnInit {
    constructor(
        @Inject(AuthUrlConstantServiceToken)
        private readonly _authUrlConstantService: IAuthUrlConstantService,
        private readonly _authService: AuthenticationService,
        private readonly _router: Router
    ) {}

    ngOnInit() {
        this._authService.completeAuthentication();
        
        this._router.navigate(
            [this._authUrlConstantService.getAuthSuccessCallbackRedirectUrl()]
        );
    }
}

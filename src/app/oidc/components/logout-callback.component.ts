import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, AuthUrlConstantServiceToken, IAuthUrlConstantService } from '../services';

@Component({
    selector: 'logout-callback',
    template: ''
})
export class LogoutCallbackComponent implements OnInit {
    constructor(
        @Inject(AuthUrlConstantServiceToken)
        private readonly _authUrlConstantService: IAuthUrlConstantService,
        private readonly _authService: AuthenticationService,
        private readonly _router: Router
    ) {}

    ngOnInit() {
        this._authService.completeLogout();
        
        this._router.navigate(
            [this._authUrlConstantService.getLogoutCallBackRedirectUrl()]
        );
    }
}

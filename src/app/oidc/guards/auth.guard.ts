import { Injectable } from '@angular/core';
import {
    CanActivate
} from '@angular/router';
import {
    AuthenticationService
} from '../services';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly _authService: AuthenticationService,
    ) {}

    async canActivate() {
        if (this._authService.isLoggedIn()) {
            return true;
        }

        await this._authService.startAuthentication();
        return false;
    }
}

import { Component, OnInit } from '@angular/core';
import { AuthenticationService} from '../services';

@Component({
    selector: 'silent-callback',
    template: ''
})
export class SilentCallbackComponent implements OnInit {
    constructor(
        private readonly _authService: AuthenticationService,

    ) {}

    async ngOnInit() {
        this._authService.silentSignInAuthentication();
    }
}
import { Injectable } from '@angular/core';
import { User, UserManager, WebStorageStateStore} from 'oidc-client';
import { EntryPointClientSettings } from '../models';


@Injectable()
export class AuthenticationService {
    constructor() { }

    isUserDefined = false;
    private _user: User | null;
    private _userManager: UserManager;

    isLoggedIn() {
        return this._user != null && !this._user.expired;
    }

    getAccessToken() {
        return this._user ? this._user.access_token : '';
    }

    async startAuthentication(): Promise<void> {
        await this.GetUserManager();
        return this._userManager.signinRedirect();
    }

    async completeAuthentication() {
        await this.GetUserManager();
        return this._userManager.signinRedirectCallback().then(user => {
            this._user = user;
            this.isUserDefined = true;
        });
    }


    async startLogout(): Promise<void> {
        await this.GetUserManager();
        return this._userManager.signoutRedirect();
    }

    async completeLogout(){
        await this.GetUserManager();
        this._user = null;
        return this._userManager.signoutRedirectCallback();
    }

    
    async silentSignInAuthentication() {
        await this.GetUserManager();
        return this._userManager.signinSilentCallback();
    }


    private async GetUserManager(){

        if (!this._userManager){
            const entryPointClientSettings: EntryPointClientSettings = new EntryPointClientSettings();

                entryPointClientSettings.userStore = new WebStorageStateStore({store: window.localStorage});
                //set up settings

                this._userManager = new UserManager(entryPointClientSettings);

                this._userManager.getUser().then(user => {
                    this._user = user;
                    this.isUserDefined = true;
                });
        }
    }

    getClaims() {
        return this._user?.profile;
    }
}

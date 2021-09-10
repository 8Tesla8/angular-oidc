import { Injectable } from '@angular/core';
import { User, UserManager, WebStorageStateStore } from 'oidc-client';
import { UserManagerSettings } from '../models';

@Injectable()
export class AuthenticationService {
  constructor() {}

  isUserDefined = false;
  private _user: User | null;
  private _userManager: UserManager;

  isLoggedIn() {
    return this._user != null && !this._user.expired;
  }

  getAccessToken() {
    return this._user ? this._user.access_token : '';
  }

  getClaims() {
    return this._user?.profile;
  }

  async startAuthentication(): Promise<void> {
    this.GetUserManager();
    return this._userManager.signinRedirect();
  }

  async completeAuthentication() {
    this.GetUserManager();
    return this._userManager.signinRedirectCallback().then((user) => {
      this._user = user;
      this.isUserDefined = true;
    });
  }


  async startLogout(): Promise<void> {
    this.GetUserManager();
    return this._userManager.signoutRedirect();
  }

  async completeLogout() {
    this.GetUserManager();
    this._user = null;
    return this._userManager.signoutRedirectCallback();
  }


  async silentSignInAuthentication() {
    this.GetUserManager();
    return this._userManager.signinSilentCallback();
  }


  private GetUserManager() {
    if (!this._userManager) {
      const userManagerSettings: UserManagerSettings =
        new UserManagerSettings();

      //set up settings
      userManagerSettings.authority = ''; //website that responsible for authorization
      userManagerSettings.client_id = ''; //uniqe name to identify the project
      userManagerSettings.response_type = 'code'; //desired authorization processing flow - for angular is sutible code flow
      userManagerSettings.scope = ''; //specify the access privileges, specifies the information returned about the authenticated user.
      //Standard Scopes: openid, profile 

      userManagerSettings.redirect_uri = 'http://localhost:4200/login-callback'; //start login process
      userManagerSettings.post_logout_redirect_uri = 'http://localhost:4200/logout-callback'; //start logout process

      userManagerSettings.automaticSilentRenew = true;
      userManagerSettings.silent_redirect_uri = 'http://localhost:4200/silent-callback'; //silent renew oidc doing it automaticly 

      userManagerSettings.userStore = new WebStorageStateStore({
        store: window.localStorage,
      }); // store information about authorization in localStorage

      this._userManager = new UserManager(userManagerSettings);

      this._userManager.getUser().then((user) => {
        this._user = user;
        this.isUserDefined = true;
      });
    }
  }

}

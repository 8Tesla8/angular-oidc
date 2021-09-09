import { InjectionToken } from '@angular/core';

// use implementation of IAuthUrlConstantService to use components:  
// LoginCallbackComponent and LogoutCallbackComponent

// tip: search all reference for AuthUrlConstantServiceToken

export const AuthUrlConstantServiceToken = new InjectionToken<IAuthUrlConstantService>(
    'IUrlConstantService injection token'
);

export interface IAuthUrlConstantService {
    getServiceName(): string;
    getAuthSuccessCallbackRedirectUrl(): string;
    getLogoutCallBackRedirectUrl(): string;
}

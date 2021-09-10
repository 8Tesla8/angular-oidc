export class UserManagerSettings {    
    authority : string;
    client_id : string;
    redirect_uri : string;
    post_logout_redirect_uri: string;
    response_type: string;
    scope : string;
    silent_redirect_uri : string;
    automaticSilentRenew : boolean;
    accessTokenExpiringNotificationTime : number;
    filterProtocolClaims : boolean;
    loadUserInfo : boolean;
    lockSkew : number ;
    userStore: any;
}

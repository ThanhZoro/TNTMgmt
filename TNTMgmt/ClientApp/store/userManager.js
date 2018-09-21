import Oidc from 'oidc-client'
import Vue from 'vue'
import VueCookie from 'vue-cookie'
Vue.use(VueCookie);

const userManager = new Oidc.UserManager({
    userStore: new Oidc.WebStorageStateStore(),
    authority: Vue.cookie.get('identityServer'),
    client_id: Vue.cookie.get('tenantId'),
    redirect_uri: window.location.origin + "/callback.html",
    post_logout_redirect_uri: window.location.origin,

    // if we choose to use popup window instead for logins
    //popup_redirect_uri: window.location.origin + "/popup.html",
    //popupWindowFeatures: "menubar=yes,location=yes,toolbar=yes,width=1200,height=800,left=100,top=100;resizable=yes",

    // these two will be done dynamically from the buttons clicked, but are
    // needed if you want to use the silent_renew
    response_type: "id_token token",
    scope: "openid profile email api api2.read_only",

    // this will toggle if profile endpoint is used
    loadUserInfo: true,

    // silent renew will get a new access_token via an iframe
    // just prior to the old access_token expiring (60 seconds prior)
    silent_redirect_uri: window.location.origin + "/silent.html",
    automaticSilentRenew: true,

    // will revoke (reference) access tokens at logout time
    revokeAccessTokenOnSignout: true,

    // this will allow all the OIDC protocol claims to be visible in the window. normally a client app
    // wouldn't care about them or want them taking up space
    filterProtocolClaims: false
});

export default userManager;

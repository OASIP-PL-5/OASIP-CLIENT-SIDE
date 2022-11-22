import {UserAgentApplication} from "msal"

var msalConfig = {
    auth: {
        // 'Application (client) ID' of app registration in Azure portal - this value is a GUID
        clientId: "ee65d1fb-fa0e-40a0-ad33-aaf6a32d083d",
        // Full directory URL, in the form of https://login.microsoftonline.com/<tenant-id>
        authority: "https://login.microsoftonline.com/6f4432dc-20d2-441d-b1db-ac3380ba633d",
        // Full redirect URL, in form of http://localhost:3000
        redirectUri: "http://localhost:3000/",
    },
    cache: {
        cacheLocation: "localStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: true, // Set this to "true" if you are having issues on IE11 or Edge
    }
};

var requestObj = {
    scopes: ["user.read"]
}

var myMSALObj = new UserAgentApplication(msalConfig);

var login = async ()=>{
    var authResult = await myMSALObj.loginPopup(requestObj);
    return authResult.account;
}

export default{
    login
};
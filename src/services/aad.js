import { UserAgentApplication } from "msal";

var msalConfig = {
    auth: {
        clientId: "634fde75-c93d-4e46-9b36-5f66eff43805",
        authority: "https://login.microsoftonline.com/6f4432dc-20d2-441d-b1db-ac3380ba633d",
        redirectURI: "https://intproj21.sit.kmutt.ac.th/pl5/"
        // local:: http://localhost:3000/
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true
    }
};

var reqeustObj = {
    scopes: ["user.read"]
}

var myMSALObj = new UserAgentApplication(msalConfig);

var login = async () => {
    var authResult = await myMSALObj.loginPopup(reqeustObj);
    return authResult.account;
}

export default {
    login
}
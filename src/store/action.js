import * as actionTypes from './actionTypes';

import { CometChat } from '@cometchat-pro/chat';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};
const appID = "197844ae70a4352e";
const region = "us";
const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build();
CometChat.init(appID, appSetting).then(
  () => {
    console.log("Initialization completed successfully");
    // You can now call login function.
  },
  error => {
    console.log("Initialization failed with error:", error);
    // Check the reason for error and take appropriate action.
  }
);

let authKey = "057696e486c19e8b192a0a075989697968919508";
var uid = "saif";
var name = "Kevin";

var user = new CometChat.User(uid);
user.setName(name);
CometChat.createUser(user, authKey).then(
    user => {
        console.log("user created", user);
    },error => {
        console.log("error", error);
    }
)
export const authSuccess = (user) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        user: user,
        isLoggedIn: true
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logoutSuccess = () => {
    return {
        type: actionTypes.AUTH_LOGOUT,
        authRedirectPath: "/login"
    };
}

export const logout = () => {
    return dispatch => {
        CometChat.logout().then(dispatch(logoutSuccess()));
    }
    
};

export const auth = (uid, authKey) => {

    return dispatch => {

        dispatch(authStart());

        CometChat.login(uid, authKey).then((user) => {

            if(user) {
                dispatch(authSuccess(user));
            } else {
                dispatch(authFail(user));
            }
            
        }).catch(error => {
            console.log('CometChatLogin Failed', error);
            dispatch(authFail(error));
        });
    };
};

export const authCheckState = () => {
    return dispatch => {
        CometChat.getLoggedinUser().then(user => {
            
            if(user) {
                dispatch(authSuccess(user));
            } else {
                dispatch(authFail(user));
            }
      
        }).catch(error => {
            dispatch(authFail(error));
        });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};
// Since we are only using the authentication API request here, we don't have to create our own axios-orders baseURL 
import axios from 'axios';

import * as actionTypes from './actionTypes';

// no need for input - just need to return the loading state and the spinner 
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

// Here we will need to pass the authentication data 
export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

// Here we will need to pass the authentication data 
export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

// so now we have to create the logout action 
// Here we will also access localStorage in order to clear the localStorage
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

// Since the token only lasts 60 minutes, we need to create a new action for logging out
// we will dispatch this checkAuthTimeout action when we get back a success response 
// this will be an aysnc function 
// setTimeout expects milliseconds so we have to multiply the value by 1000
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(()=>{
            // We want to automatically log out the user if the timeout is reached 
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

// we of course need to add one more action type to deal with the async code 
// We will use firebase as our authentication token - this is not a react based functionality 
// in order to sign-up, we need to send a post request - API KEY needs to be replaced with the one from our database
// go to Authentication - top right corner - web setup to grab API key 
// per documentation - email, password, and returnSecureToekn are the payloads 
// we have to also pass a method for either sign-in or sign-up
export const auth = (email, password, isSignup) => {
    return dispatch => {
        // here we will authenticate user
        dispatch(authStart());
        const authData = {
            email: email, 
            password: password,
            returnSecureToken: true
        };
        // we will set default methods for either sign-in or sign-up
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCE3nWvH6jeTKSoZ-l9O8gSPvv6QJ8XxlI';
        if (!isSignup) {
            url ='https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCE3nWvH6jeTKSoZ-l9O8gSPvv6QJ8XxlI';
        }

        // axios.post will return a promise which we will need to resolve or reject 
        // we then dispatch either authSuccess or authFail 
        // HERE we will now store the token in the browser's local storage in order to have a peristent Auth state 
        // Date() without arguments gets the current date, while Date() with arguments returns us a date 
        axios.post(url, authData)
            .then(response => {
                console.log(response);
                // Here we will create a variable for the actual expiration date 
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
                // Here we will access localstorage - first argument is the key and 2nd arg is the actual value for the key 
                localStorage.setItem('token', response.data.idToken);
                // Here we will store the expiration date for the token 
                localStorage.setItem('expirationDate', expirationDate);
                // AND finally we will set the userID in localStorage
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                // So now we will also dispatch the checkAuthTimeout when authSuccess occurs 
                // expiresIn is a property with firebase response token 
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err =>{
                // console.log(err);
                // this is the error message path from axios
                dispatch(authFail(err.response.data.error));
            })
    }
}

// Now we create the action for setting the redirect based on authentication 
// we will pass path as the argument so that we can redirect to pages easily
export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

// HERE we will now create a new action for checking the authentication status 
export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token){
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if (expirationDate <= new Date()) {
                dispatch(logout())
            } else {
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token, userId));
                // Here we will dispatch checkAuthTimeout depending upon the remaining seconds 
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
            }
        }
    };
}
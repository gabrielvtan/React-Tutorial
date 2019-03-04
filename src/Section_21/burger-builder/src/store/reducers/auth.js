// We now create another reducer file for managing the actions of authentication 
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

// HERE we will a new state for redirect so that we can move users to either the checkout or signin page 
// the state will be a url path 
const initialState = {
    token: null, 
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
};

const authStart = (state, action) => {
    return updateObject(state, {error: null, loading: true})
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        error: null, 
        loading: false})
};

const authFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false 
    })
};

// now we create the reducer for logging out 
const authLogout = (state, action) => {
    return updateObject( state, {
        token: null,
        userId: null
    })
};

// here we will set the reducer for redirect - the action will be the path we want to redirect to 
const setAuthRedirectPath = (state, action) => {
    return updateObject(state, {authRedirectPath: action.path})
};

const reducer = (state =initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);    
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state,action);
        default:
            return state;
    }
};

export default reducer; 
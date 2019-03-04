// Here we have to test the reducers 

import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

// Here we are testing to see what is passed to the reducer once the person has logged in
describe('auth reducer', ()=> {
    it('should return the initial state', ()=> {
        expect (reducer(undefined, {})).toEqual({
            token: null, 
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    })

    it('should store the token upon login', ()=>{
        expect(reducer({
            token: null, 
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        }, {
            type: actionTypes.AUTH_SUCCESS, 
            idToken: 'some-token',
            userId: 'some-user-id'
        })).toEqual({
            token: 'some-token', 
            userId: 'some-user-id',
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    })
});
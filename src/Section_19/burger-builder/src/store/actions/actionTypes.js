// Here we will build in the actions which will be imported into Redux

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";

// Let's create a new action type for setting the ingredients
export const SET_INGREDIENTS = 'SET_INGREDIENTS';

// We have to create an action type for errors
export const FETCH_INGREDIENTS_FAILED = 'FETCH_INGREDIENTS_FAILED';

// Here we will now create an action for setting the loading state to true 
export const PURCHASE_BURGER_START = 'PURCHASE_BURGER_START';

// Lets now create the actions for success and failure of the request
// we don't need an action for submitting the order as that will be part of the async code 
export const PURCHASE_BURGER_SUCCESS = 'PURCHASE_BURGER_SUCCESS';
export const PURCHASE_BURGER_FAIL = 'PURCHASE_BURGER_FAIL';

// Here we will create an action type for redirecting pages - it will be dispatched whenever we load the checkout page 
export const PURCHASE_INIT = 'PURCHASE_INIT';

// Here we will create the redux action for fetching the orders - it will also need a success and fail actions just like the purchase burger 
export const FETCH_ORDERS_START = 'FETCH_ORDERS_START';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_FAIL = 'FETCH_ORDERS_FAIL';

// Here we will create the redux actiontypes for authentication start 
export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
// Now we create the action for loggin out 
export const AUTH_LOGOUT ='AUTH_LOGOUT';

// NOW we create an action for redirecting the user 
export const SET_AUTH_REDIRECT_PATH = 'SET_AUTH_REDIRECT_PATH';
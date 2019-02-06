// this is the node.js import syntax
const redux = require('redux');
const createStore = redux.createStore; // this creates a store in redux 

// this file won't be included within the react project, instead, it is just to show the 
// different concepts of redux in one file and show that it's independent from react
// This will be executed with node.js instead 
// The following below are the different parts of a redux application 

// in order to run this app in node, you need to go to the terminal and type in:
// node file.js

// here we have to initialize the state
const initialState = {
    counter: 0
}

// Reducer
// we actually need to create the reducer prior to the Store 
// the reducer always takes two arguments, 1)  current state and 2) the action to be done on the current state 
// the purpose of the reducer is to return the updated state
// state = initialState is an ES6 function which allows you to pass a state value to a variable argument - whenever state is initially undefined
// here we also add the actions to be done upon the state - the varibale props are the ones defined whenever actions are dispatched  
const rootReducer = (state = initialState, action) => {
    if (action.type === 'INC_COUNTER') {
        // for good case practices, we will return an object which is a copy of the initial state
        return {
            ...state, 
            counter: state.counter + 1
        }
    }
    if (action.type === 'ADD_COUNTER') {
        // we access action.value 
        return {
            ...state, 
            counter: state.counter + action.value 
        }
    }
    return state;
};


//Store 
// Stores must be initialized with a reducer as the argument 
// the reducer is the only thing that will update the state in the end 
const store = createStore(rootReducer); 
console.log(store.getState());

// Subscription
// allow so that you don't have to manually call getState
// subscribe takes an argument, a function which will executed when ever the state is updated 
// subscriptions generally go after whenever the store is created - they are executed whenever ation is dipatched and mutates the store 
store.subscribe(() => {
    console.log('[Subscription]', store.getState());
});


// Dispatching Action
// dispatch() takes a JS object which needs to have a type property as an argument 
// the object will later be an import building block in getting the information which tupe of action was dispatched 
// type is just a unique identifier of your choice - convention is to use an all upper case string 
// you may pass additional arguments to the JS object such as payload which may also be another JS object 
store.dispatch({type: 'INC_COUNTER'});
// we a different dispatch for a differnt action where we add by a specific number
store.dispatch({type: 'ADD_COUNTER', value: 10});
console.log(store.getState());


import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// we have to import the middleware functionality & compose for connecting to the Chrome dev tools
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'; 
// in order to run asynchronous code, we will use a library called redux-thunk which allows us to return a promise of a function in redux 
// it essentially exports the middleware 
import thunk from 'redux-thunk';

import counterReducer from './store/reducers/counter';
import resultReducer from './store/reducers/result';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const rootReducer = combineReducers({
    ctr: counterReducer,
    res: resultReducer
});

// Middleware is some code you can put between the framework receiving a request, and the framework generating the resoponse. 
// Redux middleware is used for logging, crash reporting, talking to an asynchronous API, routing, etc. 

// Here is middleware which logs each action we issue - it will take in a function, using store, and return in another function 
// next marks the next function to be executed which will be executed by redux in the end - it also returns a final function which returns an action
const logger = store => {
    return next => {
        return action => {
            console.log('[MIddleware] Dispatching', action)
            const result = next(action);
            console.log('[Middleware] next state', store.getState())
            return result; 
        }
    }
};

// Here we are setting up a connection for middleware to chrome dev tools or fall back to redux native solution without redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// we can include an enhancer as the second argument and apply the logger constant or a list of middleware functions
// we add thunk as an argument for applyMiddleware in porder to export the middleware functions 
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();

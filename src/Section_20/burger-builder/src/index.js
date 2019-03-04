import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import thunk from 'redux-thunk'
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';

// HERE we now set up the application to show less in redux when deployed but to show everything when in development mode 
// NOW REDUX devtools are only available in the development environment 
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose ;

// Let's combine our reducers together 
const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer,
    auth: authReducer
});

// rememberto always createStore
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

// Always make sure to wrap your App within a BrowserRouter
// The Provider tags should wrap everything within the app tag 
const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux'; // combineReducers is a helper function for combining reducers 
import { Provider } from 'react-redux';

import counterReducer from './store/reducers/counter';
import resultReducer from './store/reducers/result';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// combineReducers() takes a JS function as input 
const rootReducer = combineReducers({
    ctr: counterReducer,
    res: resultReducer
});

const store = createStore(rootReducer);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();

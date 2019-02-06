import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
// here we need to include an additional package which will allow us to connect redux with react
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './store/reducer';

// here is where we will create our store for redux 
const store = createStore(reducer); 

// We then wrap our App component with Provider - which is a helper component
// which allows use to inject our store into react components
// we pass store as a prop to Provider so that the React app will have the redux store 
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

// Here we set up a global configuration for axios - now only the /path is needed for all the other axios requests
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com'; 

// Here we can also access default headers and there set a common header, so that common object of authorization, 
// common headers are simply the general headers which are set for all types of requests, so there you can set your
// auth token if you had one
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';

// You can also set headers for just specific request types, like for post requests only where you maybe where you 
// want to set the content type you're sending to application.json (which is default)
axios.defaults.headers.post['Content-Type'] = 'application/json';

// This is the most global file so it will be where we add interceptors to execute code globally
// this axios.interceptors may be accessed anywhere in the app - use (like get) takes a function as input 
// you must alway return the request(variable), otherwise the interceptor will be blocked
// you then can add a second function for the error handling where we should also return promise reject error so that we 
// still forward it to our request as we wrote it in a component where we can handle it again with the catch method
axios.interceptors.request.use(request => {
    console.log(request);
    return request;
}, error => {
    // this error pops up if the request to the server fails
    console.log(error);
    return Promise.reject(error);
});

// now this interceptor is set up to deal with responses
axios.interceptors.response.use(response => {
    console.log(response);
    return response;
}, error => {
    // this error pops up if the response to the server fails
    console.log(error);
    return Promise.reject(error);
});

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();

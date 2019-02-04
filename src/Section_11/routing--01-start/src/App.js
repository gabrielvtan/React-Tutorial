import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';

import Blog from './containers/Blog/Blog';

class App extends Component {
  render() {
    return (
      // Here we wrap the entire blog in the BrowserRouter so that we can now add different url paths
      // basename is a props that lets you set a default route
      //<BrowserRouter basename="/">
      <BrowserRouter basename="/">
        <div className="App">
            <Blog />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';

import Blog from './containers/Blog/Blog';

class App extends Component {
  render() {
    return (
      // Here we wrap the entire blog in the BrowserRouter so that we can now add different url paths
      <BrowserRouter>
        <div className="App">
            <Blog />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

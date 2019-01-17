import React, { Component } from 'react';
import './App.css';
// it is convention to name the import with a capital letter for a given file
import Person from './Person/Person'

class App extends Component {
  render() {
    return (
    // Must always use 'className' instead of 'class' for labeling components
    // good practice to wrap everything within a given root element you are returning
    // Keep in mind that is isn't HTML code, but JS
      <div className="App">
        <h1>Hi, I'm a React App </h1>
        <p> This is really working</p>
        {/* This is customized HTML tag with a self closing back slash */}
        <Person />
        <Person />
        <Person />
      </div>
    );
    // createElement takes 3 arguments - This is not the recommended way of creating React components
    // 1st is HTML element, 2nd is JS method (or in this example, the className), 3rd is amount of children
    // return React.createElement('div', {className:'App'}, React.createElement('h1', null, 'Does this work now?'))
  }
}

export default App;

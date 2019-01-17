import React, { Component } from 'react';
import './App.css';
// it is convention to name the import with a capital letter for a given file
import Person from './Person/Person'

class App extends Component {
  // The following only works in 'class extends component'
  // Unlike "props" which accesses properties from outside a component, "state" accesses properties within a component
  state = {
      persons: [
          {name: 'Gabby', age: 27},
          {name: 'Person2', age: 100},
          {name: 'Person3', age: 50}
      ],
      otherState: 'some other value'
  }

  // Handler is used by convention to show that you are not actively calling the method, but using it as an event handler
  switchNameHandler = (newName) => {
    //   console.log('Was Clicked!');
    // DONT DO THIS: this.state.persons[0].name='Gabriel';
    // this is how you're able to change the current state of variables within a given component
    this.setState({
        persons: [
            {name: newName, age: 27},
            {name: 'Person2', age: 100},
            {name: 'Person3', age: 32}
        ]
    })
  }

  // this is for inputing a specific name
  // event.target.value is how you access the value being inputted into the app
  nameChangedHandler = (event) => {
    this.setState({
        persons: [
            {name: 'Gabby', age: 27},
            {name: event.target.value, age: 100},
            {name: 'Person3', age: 32}
        ]
    })
  }

  render() {
    return (
    // Must always use 'className' instead of 'class' for labeling components
    // good practice to wrap everything within a given root element you are returning
    // Keep in mind that is isn't HTML code, but JS
      <div className="App">
        <h1>Hi, I'm a React App </h1>
        <p> This is really working</p>
        {/* onClick is the event listener */}
        {/* adding a () to the end of switchNameHandler will cause the method to be execute immediately, so leave it out in this case */}

        {/* you can use the bind(this, list) in order to bind input to the new name (i.e. passing an arugment)*/}
        {/* <button onClick={this.switchNameHandler.bind(this, 'Gabriel')}>Switch Name</button> */}
        {/* You may also use the construction below, however, it is not the most efficient way to create the click method */}
        <button onClick={() =>this.switchNameHandler('Gabriel!!!!')}>Switch Name</button>
        {/* This is customized HTML tag with a self closing back slash */}
        {/* You can access state by using this.state.persons[n].name */}
        <Person 
            name ={this.state.persons[0].name} 
            age = {this.state.persons[0].age}/>
        {/* You have the ability to pass functions within the parent component to the children component through the this.switchNameHandler method*/}
        {/* We can now add changed as a function within the person component */}
        <Person 
            name = {this.state.persons[1].name} 
            age = {this.state.persons[1].age}
            click={this.switchNameHandler.bind(this, 'GABBBBBBY')}
            changed={this.nameChangedHandler}>My Hobbies: Racing </Person>
        <Person 
            name = {this.state.persons[2].name}
            age = {this.state.persons[2].age}/>
      </div>
    );
    // createElement takes 3 arguments - This is not the recommended way of creating React components
    // 1st is HTML element, 2nd is JS method (or in this example, the className), 3rd is amount of children
    // return React.createElement('div', {className:'App'}, React.createElement('h1', null, 'Does this work now?'))
  }
}

export default App;

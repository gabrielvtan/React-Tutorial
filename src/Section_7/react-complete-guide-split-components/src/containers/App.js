import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

// When creating components, always try to be lean and break up the components and the containers
// Also try to have as little as possible within the return and render function

class App extends Component {
  state = {
      persons: [
          {id: 'ddsf', name: 'Gabby', age: 27},
          {id: 'kljsa', name: 'Andrew', age: 100},
          {id: 'dsfv', name: 'Oswald', age: 50}
      ],
      otherState: 'some other value',
      showPersons: false 
  }

  switchNameHandler = (newName) => {
    this.setState({
        persons: [
            {name: newName, age: 27},
            {name: 'Person2', age: 100},
            {name: 'Person3', age: 32}
        ]
    })
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
        return p.id === id;
    });

    const person = {
        ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons: persons});
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons]
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }
  
  render() {
    let persons = null;


    // Here we are changing the format of the render function to be easier to read
    if (this.state.showPersons) {
        persons = <Persons
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler}/>;
    }

    // In this example, we bind a given method within App.js to a specific variable 
    // this variable references a specific functional component that is imported into App
    return (
      <div className={classes.App}>
        <Cockpit 
            showPersons={this.state.showPersons} 
            persons={this.state.persons}
            clicked={this.togglePersonsHandler}/>
        {persons}
      </div>
    );
  }
}

export default App;

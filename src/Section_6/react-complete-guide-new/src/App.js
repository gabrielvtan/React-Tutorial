import React, { Component } from 'react';
// This is how you use the CSS loader to import specific classes within the App.css file
import classes from './App.css';
import Person from './Person/Person';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

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
    // Get a btnClass to set to null to change the toggle color
    let btnClass = '';

    // Here we have to wrap Person in ErrorBoundary then also move key into ErrorBoundary
    if (this.state.showPersons) {
        persons = (
        <div>
            {this.state.persons.map((person, index) => {
                return <ErrorBoundary key={person.id}>
                    <Person 
                    click={() => this.deletePersonHandler(index)}
                    name={person.name} 
                    age={person.age} 
                    changed={(event) => this.nameChangedHandler(event, person.id)}/>
                    </ErrorBoundary>
            })}
        </div>
        );
        // need to add btnClass within the if statement
        btnClass = classes.Red;
    }

    // Because of the CSS modules we no longer need to pass in strings but rathers classes.red
    const assignedClasses = [];
    if (this.state.persons.length <=2) {
        assignedClasses.push( classes.red ); // classes = ['red']
    }
    if (this.state.persons.length <= 1) {
        assignedClasses.push( classes.bold ); // ['red','bold']
    }

    return (
      <div className={classes.App}>
        <h1>Hi, I'm a React App </h1>
        <p className={assignedClasses.join(' ')}> This is really working</p>
        {/* Here we add className to change the color of the buttons */}
        <button 
            className = {btnClass}
            onClick={this.togglePersonsHandler}>Toggle Persons</button>
        {persons}
      </div>
    );
  }
}

export default App;

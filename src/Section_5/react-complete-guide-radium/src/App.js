import React, { Component } from 'react';
import './App.css';
import Radium, { StyleRoot } from 'radium';
import Person from './Person/Person';


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
  
  // 'hover' is a psuedo-selection that we are able to add because of the Radium library
  render() {
    const style ={
        backgroundColor: 'green',
        color:'white',
        font: 'inherit',
        border: '1x solid blue',
        padding: '8px',
        cursor: 'pointer',
        ':hover':{
            backgroundColor: 'lightgreen',
            color: 'black'
        }
    };

    let persons = null;

    if (this.state.showPersons) {
        persons = (
        <div>
            {this.state.persons.map((person, index) => {
                return <Person 
                    click={() => this.deletePersonHandler(index)}
                    name={person.name} 
                    age={person.age} 
                    key={person.id} 
                    changed={(event) => this.nameChangedHandler(event, person.id)}/>
            })}
        </div>
        );
        // This is how you dynamically style the toggle button to switch colors whenever the showPersons is toggled
        // style[':hover'] is how you add the Radium library to the style
        style.backgroundColor = 'red';
        style[':hover'] = {
            backgroundColor: 'salmon',
            color: 'black'
        }
    }

    // here we have to create a new variable in order to change the style dynamically based on the number of persons in the list shown
    const classes = [];
    if (this.state.persons.length <=2) {
        classes.push('red'); // classes = ['red']
    }
    if (this.state.persons.length <= 1) {
        classes.push('bold'); // ['red','bold']
    }

    return (
      // You have to wrap the entire App in the StyleRoot in order to apply the Radium Styling   
      <StyleRoot>
      <div className="App">
        <h1>Hi, I'm a React App </h1>
        {/* We have to use classes.join(' ') here because we now have a list of styles */}
        <p className={classes.join(' ')}> This is really working</p>
        {/* Here we change the button style depending on whether we will show the persons or not */}
        <button 
            style = {style}
            onClick={this.togglePersonsHandler}>Toggle Persons</button>
        {persons}
      </div>
      </StyleRoot>
    );
  }
}

// Radium is a higher order component - which allows us to wrap our app into our component
export default Radium(App);

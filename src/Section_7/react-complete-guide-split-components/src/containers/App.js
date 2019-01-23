import React, { PureComponent } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

// When creating components, always try to be lean and break up the components and the containers
// Also try to have as little as possible within the return and render function

// As a reminder, Stateful(Containers) uses the syntax 'class XY extends Component'
// they give you access to State and Lifecycle Hooks - should only be used to manage these
// You access state and props via "this"
// this.state.XY & this.props.XY

// Stateless containers use the syntax 'const XY = (props) => {...}
// you don't have access to State and Lifecycle Hooks - should be used in all other classes
// Access Props via "props"
// props.XY

class App extends PureComponent {
  // Here we add the constructor and must include super(props) in order to access the props -this is a lifestyle hook
  constructor(props) {
      super(props);
      console.log('[App.js] Inside Constructor', props)
      // this is how we include state into the constructor, this is how it was done in older React versions - it is not as efficient as 
      // including state outside the constructor    
      this.state = {
        persons: [
            {id: 'ddsf', name: 'Gabby', age: 27},
            {id: 'kljsa', name: 'Andrew', age: 100},
            {id: 'dsfv', name: 'Oswald', age: 50}
        ],
        otherState: 'some other value',
        showPersons: false 
    };
  }

  // the following are other Lifestyle Hooks
  componentWillMount() {
      console.log('[App.js] Inside componentWillMount()');
  }

  componentDidMount(){
      console.log('[App.js] inside componentDidMount');
  }

  
//   shouldComponentUpdate(nextProps, nextState) {
//     console.log('[UPDATE App.js] Inside shouldComponentUpdate', nextProps, nextState);
//     // this method returns either true or false and thus either continues or discontinues the UPDATE
//     // here we only want to continue if nextProps.persons is not equal to the old persons
//     // similar to Perons.js - we have control the re-rendering of the DOM by checking the state elements
//     // Checking if state or props have changed is a good case practice for control flow and application efficiency 
//     return nextState.persons !== this.state.persons ||
//         nextState.showPersons !== this.state.showPersons;
//   }

  componentWillUpdate (nextProps, nextState) {
        console.log('[UPDATE App.js] Inside componentWillUpdate', nextProps, nextState);
  }

  componentDidUpdate () {
        console.log('[UPDATE App.js] Inside componentDidUpdate');
  }


  // this is the more modetn way of putting in elements of a state
//   state = {
//       persons: [
//           {id: 'ddsf', name: 'Gabby', age: 27},
//           {id: 'kljsa', name: 'Andrew', age: 100},
//           {id: 'dsfv', name: 'Oswald', age: 50}
//       ],
//       otherState: 'some other value',
//       showPersons: false 
//   }

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
    console.log('[App.js] inside render()')
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
    // Though we never used props, we are given access to it through this.props.title, and that is how we access other components in the index.js file
    return (
      <div className={classes.App}>
        <button onClick={() => {this.setState({showPersons:true})}}>Show Persons</button>
        <Cockpit 
            appTitle={this.props.title}
            showPersons={this.state.showPersons} 
            persons={this.state.persons}
            clicked={this.togglePersonsHandler}/>
        {persons}
      </div>
    );
  }
}

export default App;

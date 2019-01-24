import React, { PureComponent } from 'react';

import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import Aux from '../hoc/Aux';
import withClass from '../hoc/WithClass';

// this is new with 16.3 which allows us to easily access authentication through React.createContext
export const AuthContext = React.createContext(false);

class App extends PureComponent {
  constructor( props ) {
    super( props );
    console.log( '[App.js] Inside Constructor', props );
    this.state = {
      persons: [
        { id: 'asfa1', name: 'Max', age: 28 },
        { id: 'vasdf1', name: 'Manu', age: 29 },
        { id: 'asdf11', name: 'Stephanie', age: 26 }
      ],
      otherState: 'some other value',
      showPersons: false,
      toggleClicked: 0,
      authenticated: false
    };
  }

  componentWillMount () {
    console.log( '[App.js] Inside componentWillMount()' );
  }

  // this is discouraged because they often are used incorrectly and often causes mistakes
  componentDidMount () {
    console.log( '[App.js] Inside componentDidMount()' );
  }

  // shouldComponentUpdate ( nextProps, nextState ) {
  //   console.log( '[UPDATE App.js] Inside shouldComponentUpdate', nextProps, nextState );
  //   return nextState.persons !== this.state.persons ||
  //     nextState.showPersons !== this.state.showPersons;
  // }

  // this is discouraged because they often are used incorrectly and often causes mistakes
  // componentWillReceiveProps is also discouraged for the reason above
  componentWillUpdate ( nextProps, nextState ) {
    console.log( '[UPDATE App.js] Inside componentWillUpdate', nextProps, nextState );
  }

  // this lifecycle hook gets executed whenever your props are updated and gives you a chance to update the state with props
  // however your state should rarely be coupled with the props - if they need to be combined, this should be used
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log( '[UPDATE App.js] Inside getDerivedStateFromProp', nextProps, prevState );
    return prevState;
  }

  // gets you a snapshot of the DOM prior to the update of the page
  // this is useful for saving the position on the page for a given user
  getSnapshotBeforeUpdate() {
    console.log( '[UPDATE App.js] Inside getSnapshotBeforeUpdate');
  }

  componentDidUpdate () {
    console.log( '[UPDATE App.js] Inside componentDidUpdate' );
  }

  // state = {
  //   persons: [
  //     { id: 'asfa1', name: 'Max', age: 28 },
  //     { id: 'vasdf1', name: 'Manu', age: 29 },
  //     { id: 'asdf11', name: 'Stephanie', age: 26 }
  //   ],
  //   otherState: 'some other value',
  //   showPersons: false
  // }

  nameChangedHandler = ( event, id ) => {
    const personIndex = this.state.persons.findIndex( p => {
      return p.id === id;
    } );

    const person = {
      ...this.state.persons[personIndex]
    };

    // const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState( { persons: persons } );
  }

  deletePersonHandler = ( personIndex ) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice( personIndex, 1 );
    this.setState( { persons: persons } );
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState( ( prevState, props ) => {
      return {
        showPersons: !doesShow,
        toggleClicked: prevState.toggleClicked + 1
      }
    } );
  }

  loginHandler = () =>{
    this.setState({authenticated:true});
  }

  render () {
    console.log( '[App.js] Inside render()' );
    let persons = null;

    if ( this.state.showPersons ) {
      persons = <Persons
        persons={this.state.persons}
        clicked={this.deletePersonHandler}
        changed={this.nameChangedHandler} />;
    }

    return (
      <Aux>
        <button onClick={() => { this.setState( { showPersons: true } ) }}>Show Persons</button>
        <Cockpit
          appTitle={this.props.title}
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          login={this.loginHandler}
          clicked={this.togglePersonsHandler} 
        />
          <AuthContext.Provider value={this.state.authenticated}> 
              {persons} 
          </AuthContext.Provider>
      </Aux>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default withClass( App, classes.App );

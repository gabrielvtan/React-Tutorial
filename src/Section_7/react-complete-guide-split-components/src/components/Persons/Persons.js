import React, { PureComponent } from 'react';

import Person from './Person/Person';

//Persons.js can be a functional component bc you don't need to manage state here
// In this iteration, we turn persons into a Stateful component by creating a class and extending the Component
// we also change props to this.props because we are now working in a Stateful component

// PureComponent already has a built in shouldComponentUpdate method - which only updates the DOM whenever it detects changes to the props or state
class Persons extends PureComponent {
    constructor(props) {
        super(props);
        console.log('[Persons.js] Inside Constructor', props)
        // this is how we include state into the constructor, this is how it was done in older React versions - it is not as efficient as 
        // including state outside the constructor    
    }
  
    // the following are other Lifestyle Hooks
    componentWillMount() {
        console.log('[Persons.js] Inside componentWillMount()');
    }
  
    componentDidMount() {
        console.log('[Persons.js] Inside componentDidMount');
    }

    componentWillReceiveProps(nextProps) {
        console.log('[UPDATE Persons.js] Inside componentWillReceiveProps', nextProps);
    }

    // this is one way to check updates, however, in this example we will use a PureComponent
    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('[UPDATE Persons.js] Inside shouldComponentUpdate', nextProps, nextState);
    //     // this method returns either true or false and thus either continues or discontinues the UPDATE
    //     // This is where we have to control the re-rendering of the React DOM 
    //     // here we only want to continue if nextProps.persons is not equal to the old persons or if nextProps changed
    //     return nextProps.persons !== this.props.persons || 
    //         nextProps.changed !== this.props.changed ||
    //         nextProps.clicked !== this.props.clicked;
        // return true;
    // }

    componentWillUpdate (nextProps, nextState) {
        console.log('[UPDATE Persons.js] Inside componentWillUpdate', nextProps, nextState);
    }

    componentDidUpdate () {
        console.log('[UPDATE Persons.js] Inside componentDidUpdate');
    }

    render () {
        console.log('[Persons.js] inside render()')
        return this.props.persons.map((person, index) => {
            return <Person 
                click={() => this.props.clicked(index)}
                name={person.name} 
                age={person.age} 
                changed={(event) => this.props.changed(event, person.id)}/>
    
        });
    }
} 

export default Persons;
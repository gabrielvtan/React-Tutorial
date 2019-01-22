import React, { Component } from 'react';

import Person from './Person/Person';

//Persons.js can be a functional component bc you don't need to manage state here
// In this iteration, we turn persons into a Stateful component by creating a class and extending the Component
// we also change props to this.props because we are now working in a Stateful component

class Persons extends Component {
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
  
    componentDidMount(){
        console.log('[Persons.js] inside componentDidMount');
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
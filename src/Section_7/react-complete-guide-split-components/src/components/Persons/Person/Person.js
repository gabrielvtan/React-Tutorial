import React, {Component} from 'react';
// Now we go to validating props and making sure that the prop type received is correct
import PropTypes from 'prop-types';

import classes from './Person.css';
import withClass from '../../../hoc/withClass';
import Aux from '../../../hoc/Aux';

// Here we will be coverting person into a Stateful component - similar to the Persons component
// As a reminder, we have to convert props to this.props because we now have a Stateful component

class Person extends Component {
    constructor(props) {
        super(props);
        console.log('[Person.js] Inside Constructor', props)
        // this is how we include state into the constructor, this is how it was done in older React versions - it is not as efficient as 
        // including state outside the constructor    
    }
  
    // the following are other Lifestyle Hooks
    componentWillMount() {
        console.log('[Person.js] Inside componentWillMount()');
    }
  
    componentDidMount() {
        console.log('[Person.js] inside componentDidMount');
        // focus() here is a built in JS function which highlights the input box selected
        if (this.props.position === 0) {
            this.inputElement.focus();
        }
    }

    render () {
        console.log('[Person.js] inside render()')
        return (
            <Aux classes= {classes.Person} >
                <p onClick={this.props.click}> I'm {this.props.name} and I am {this.props.age} years old!</p>
                <p>{this.props.children}</p>
                {/* Here we call the focus method from componentDidMount in order to update the App and confirm that input was changed */}
                {/* References are only available in stateful components - it allows you to create a prop which may be used elsewhere */}
                <input 
                    ref={(inp) => { this.inputElement = inp}}
                    type ="text" 
                    onChange={this.props.changed} 
                    value={this.props.name}/>
            </Aux>
        )    
    }
}

// This is how prop-types are used - we define here what types of data may be passed to the following variables
Person.propTypes = {
    click: PropTypes.func, // click must be a function
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
};

export default withClass(Person, classes.Person);
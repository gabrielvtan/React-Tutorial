import React, {Component} from 'react';
import classes from './Person.css';

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
  
    componentDidMount(){
        console.log('[Person.js] inside componentDidMount');
    }
    render () {
        console.log('[Person.js] inside render()')
        return (
            <div className= {classes.Person} >
                <p onClick={this.props.click}> I'm {this.props.name} and I am {this.props.age} years old!</p>
                <p>{this.props.children}</p>
                <input type ="text" onChange={this.props.changed} value={this.props.name}/>
            </div>
        )    
    }
}


export default Person;
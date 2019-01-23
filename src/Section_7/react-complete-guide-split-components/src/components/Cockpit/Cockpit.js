import React from 'react';
// This will also be a functional component because it will not need to manage the state of the props
// As a reminder, you simply have to use props.person.length
import classes from './Cockpit.css';
import Aux from '../../hoc/Aux';

const cockpit= (props) => {
    const assignedClasses = [];

    // Since we removed Cockpit as a CSS class for Button, we now have to change classes to update the style
    let btnClass = classes.Button;

    if (props.showPersons) {
        btnClass = [classes.Button, classes.Red].join(' ');
    }
    
    if (props.persons.length <=2) {
        assignedClasses.push( classes.red ); // classes = ['red']
    }
    if (props.persons.length <= 1) {
        assignedClasses.push( classes.bold ); // ['red','bold']
    }


    return (
        // the Aux hoc allows us to return the children of props which allows us to delete the div container which may impact our style 
        // In this example, the children are each of the html containers
        <Aux>
            {/* Here we may access props.appTitle because it is passed into the cockpit method */}
            <h1>{props.appTitle}</h1>
            <p className={assignedClasses.join(' ')}> This is really working</p>
            <button 
                className = {btnClass}
                onClick={props.clicked}>Toggle Persons</button>
        </Aux>
    );
};

export default cockpit;
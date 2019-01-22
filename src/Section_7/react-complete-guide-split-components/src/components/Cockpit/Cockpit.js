import React from 'react';
// This will also be a functional component because it will not need to manage the state of the props
// As a reminder, you simply have to use props.person.length
import classes from './Cockpit.css';

const cockpit= (props) => {
    const assignedClasses = [];
    let btnClass = '';

    if (props.showPersons) {
        btnClass = classes.Red;
    }
    
    if (props.persons.length <=2) {
        assignedClasses.push( classes.red ); // classes = ['red']
    }
    if (props.persons.length <= 1) {
        assignedClasses.push( classes.bold ); // ['red','bold']
    }

    return (
        <div className={classes.Cockpit}>
            <h1>Hi, I'm a React App </h1>
            <p className={assignedClasses.join(' ')}> This is really working</p>
            <button 
                className = {btnClass}
                onClick={props.clicked}>Toggle Persons</button>
        </div>
    );
};

export default cockpit;
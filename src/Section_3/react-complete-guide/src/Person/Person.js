import React from 'react';

import './Person.css';

// In its simplest form, a component is merely a function which returns a JSX file
// By convention, the function name should be the same as the component - just lower case
// by convention, props is used to get the properties of a given component
const person = (props) => {
    // You may add JS functions within text by wrapping the function in curly brackets
    return (
        <div className="Person">
            <p onClick={props.click}> I'm {props.name} and I am {props.age} years old!</p>
            {/* props.children is special syntax which allows you to access the value between in the opening and closing tags */}
            <p>{props.children}</p>
            {/* This updates the value of the name as the input to start */}
            <input type ="text" onChange={props.changed} value={props.name}/>
        </div>
    )
};

export default person;
import React from 'react';

import classes from './Button.css';

// for the button class here, we have to pass in an array so that we can conditionally use the success or danger class
// As a reminder the classes have to be passed in as strings
const button = (props) => (
    <button
        className={[classes.Button, classes[props.btnType]].join(' ')}
        onClick={props.clicked}>
        {props.children}
    </button>
);

export default button;
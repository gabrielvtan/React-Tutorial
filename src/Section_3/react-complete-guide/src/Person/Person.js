import React from 'react';

// In its simplest form, a component is merely a function which returns a JSX file
// By convention, the function name should be the same as the component - just lower case
const person = () => {
    // You may add JS functions within text by wrapping the function in curly brackets
    return <p> I'm a Person and I am {Math.floor(Math.random() * 30)} years old!</p>
};

export default person;
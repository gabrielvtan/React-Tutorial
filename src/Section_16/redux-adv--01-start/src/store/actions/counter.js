import * as actionTypes from './actionsTypes';
// here we will now separate the action types folder

// Here we will create action creators which will allow us to run asynchrous code 
// we then include this action into the Counter file 
export const increment = () => {
    return {
        type: actionTypes.INCREMENT
    };
};

export const decrement = () => {
    return {
        type: actionTypes.DECREMENT
    };
};

// here we need to pass in a payload as the argument 
// the payload is set as a variable that is set in the Counter.js file 
export const add = (value) => {
    return {
        type: actionTypes.ADD,
        val: value
    };
};

export const subtract = (value) => {
    return {
        type: actionTypes.SUBTRACT,
        val: value
    };
};
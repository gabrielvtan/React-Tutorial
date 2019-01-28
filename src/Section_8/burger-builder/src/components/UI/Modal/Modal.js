import React from 'react';

import classes from './Modal.css';

//This function allows us to display the props.children of a given burger order
// We now include the CSS inline style to display the animation whenever the Order Now button is toggled 
const modal = (props) => (
    <div 
        className={classes.Modal}
        style={{
            transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: props.show ? '1' : '0'
        }}>
        {props.children}
    </div>
);

export default modal
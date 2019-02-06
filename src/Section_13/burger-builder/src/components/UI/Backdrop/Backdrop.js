import React from 'react';

import classes from './Backdrop.css';

// if props.show is true, then display the div for the styling for the backdrop or return null 
const backdrop = (props) => (
    props.show ? <div className={classes.Backdrop}
    onClick = {props.clicked}></div> : null
);

export default backdrop;
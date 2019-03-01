import React from 'react';

import classes from './Spinner.css'

// here we create a spinner for the http load screen - css was taken from online 
const spinner = () => (
    <div className={classes.Loader}>Loading...</div>
);

export default spinner;
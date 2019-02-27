import React from 'react';

import classes from './BuildControl.css';

// we create this file because we will have reusable buttons per ingredient
// we also add the onClick props to include the added property
// disabled is only included in the less button
const buildControl = (props) => (
 <div className={classes.BuildControl}>
     <div className={classes.Label}>{props.label}</div>
     <button 
        className={classes.Less} 
        onClick={props.removed} 
        disabled={props.disabled}>Less</button>
     <button 
        className={classes.More} 
        onClick={props.added}>More</button>
 </div>
);

export default buildControl;
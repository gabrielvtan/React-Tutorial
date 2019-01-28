import React from 'react';

import classes from './NavigationItem.css';

// Here we set the link to props children to display the specific navigation path dynamically
const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <a 
            href={props.link} 
            className={props.active ? classes.active : null}>{props.children}</a>
    </li>
);

export default navigationItem;
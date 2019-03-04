import React from 'react';
import { NavLink } from 'react-router-dom'; 

import classes from './NavigationItem.css';

// Here we set the link to props children to display the specific navigation path dynamically
// Anchor tags (href) are not the ideal way of connecting routes - use Link from react-router-dom
// need to include exact so that only one link is highlighted whenever selected
const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <NavLink 
            to={props.link}
            exact={props.exact}
            activeClassName={classes.active}>{props.children}</NavLink>
    </li>
);

export default navigationItem;
import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

//Here we are creating multiple urls for each of pages
// NOW since we receive isAutheticated, we need to render Auth conditionally 
// We also need to add the functionality of order being visible only when the user is authenticated 
const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        {/* here we add the conditional logic for showing orders or null */}
        {props.isAuthenticated 
            ? <NavigationItem link="/orders">Orders</NavigationItem>
            : null}
        {!props.isAuthenticated 
            ? <NavigationItem link="/auth">Authenticate</NavigationItem> 
            : <NavigationItem link="/logout">Logout</NavigationItem>}
    </ul>
);

export default navigationItems;
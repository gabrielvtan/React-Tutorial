import React from 'react';

import classes from './DrawerToggle.css';

// We include 3 empty div container pairs here bc of how our drawerToggle.css file is set up 
// this replaces the menu icon
const drawerToggle = (props) => (
    <div onClick={props.clicked} className={classes.DrawerToggle}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default drawerToggle;
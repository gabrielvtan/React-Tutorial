import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import BackDrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxilary/Aux';

// this component will be the display menu when menu is clicked - this is created for mobile devices but works with PC functionality 


const sideDrawer = (props) => {
    // We use the {} here because we want to conditionally attach different CSS classes to make animations prior to returning the JSX
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    
    
    // props.closed was created in the layout component
    // HERE we also have to pass the props.isAuth to isAuthenticated as well 
    return (
        <Aux>
            <BackDrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth}/>
                </nav>
            </div>
        </Aux>
    );

}

export default sideDrawer;
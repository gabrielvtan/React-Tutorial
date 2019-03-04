import React, {Component} from 'react';
import { connect } from 'react-redux';

import Aux from '../Auxilary/Aux';
import classes from './Layout.css';
// This is where we add the toolbar for the application 
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

// Like the navigation tool bar, we also have to add the sidedrawer here because it is a main component of the app
// we will convert layout into a Stateful component in order to handle event listeners received from both the Toolbar and the SideDrawer
// we always have to render something with an extended Component and we include the JSX in the return statement
// Here we move Layout to the hoc because it actually is a hoc, as represented within the burgerbuilder container

// HERE - we will update layout to take redux so that we can pass the navigation bar over here
class Layout extends Component {
    // we have to include state here for whether the sideDrawer is currently visible or not
    state = {
        showSideDrawer: false
    }
    
    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    // here we expect the previous state as an input and in there, simply return the object you want to set to a new state
    // or you want to merge into the state
    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
           return {showSideDrawer: !prevState.showSideDrawer};
        });   
    }

    render () {
        return (
            // This is the JSX we are returning
            // From toolbar, we get the prop drawerToggleClicked which will allow use to animate the sideDrawer
            // Here we add another prop which states whether or not the user is authenticated
            <Aux>
                <Toolbar 
                    isAuth = {this.props.isAuthenticated}
                    drawerToggleClicked ={this.sideDrawerToggleHandler}/>
                <SideDrawer 
                    isAuth = {this.props.isAuthenticated}
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawerClosedHandler}/>
                <main className = {classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
} 

// here we will create a property isAutheticated so that we may be able to pass the state throughout the application 
// we will use the token state which states whether the user is authenticated or not 
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout); 
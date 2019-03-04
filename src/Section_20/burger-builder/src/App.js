import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/Checkout/Checkout'; 
// import Orders from './containers/Orders/Orders';
// import Auth from './containers/Auth/Auth';
//- we can get rid of this now because we are lazy loading it. 
// We do lazy loading because checkout does not need be accessed until the user has signed-in 
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

// here we pass a function which allows us to load a given page 
const asyncCheckout = asyncComponent(()=> {
    return import('./containers/Checkout/Checkout');
});

// here we pass a function which allows us to load a given page 
const asyncOrders = asyncComponent(()=> {
    return import('./containers/Orders/Orders');
});

// here we pass a function which allows us to load a given page 
const asyncAuth = asyncComponent(()=> {
    return import('./containers/Auth/Auth');
});


class App extends Component {
  // Again we have to include ComponentDidMount in order to kick off the authsignup
  componentDidMount() {
      this.props.onTryAutoSignUp();
  } 

  render() {
    // Here we will create the logic for the guard routes which holds jsx 
    // Here we set the default routes which unautherized users may access without logging in 
    // we have to add the switch statement because of adjacent tags 
    let routes = (
        <Switch>
            <Route path="/auth" component={asyncAuth}/>
            <Route path="/" exact component={BurgerBuilder}/>
            {/* Here we also add a default redirect path when an unautherized routes requested */}
            <Redirect to="/"/>
        </Switch>
    );
    
    // Here we add the routes that are accessible for an authenticated user 
    if (this.props.isAuthenticated) {
        routes = (
            <Switch>
                <Route path="/checkout" component={asyncCheckout} />
                <Route path="/orders" component={asyncOrders} />
                <Route path="/logout" component={Logout}/>
                {/* We need to add the auth path here as well to get the correct redirect to the order details */}
                {/* The disadvantage is that now authenticated users can visit the auth page */}
                {/* On the other hand, they can't really do any harm there */}
                <Route path="/auth" component={asyncAuth}/>
                <Route path="/" exact component={BurgerBuilder}/>
                {/* Here we also add a default redirect path when an unautherized routes requested */}
                <Redirect to="/"/>
            </Switch>
        );
    }

    return (
      <div>
        <Layout>
            {routes}
        </Layout>
      </div>
    );
  }
}

// HERE we will now create guards which will prevent the user from manually accessesing unautherized pages 
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}


// Here we will be adding MapDispatchToProps in order to check the authentication status of the user 
const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignUp: () => dispatch(actions.authCheckState())
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

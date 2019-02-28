import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

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
            <Route path="/auth" component={Auth}/>
            <Route path="/" exact component={BurgerBuilder}/>
            {/* Here we also add a default redirect path when an unautherized routes requested */}
            <Redirect to="/"/>
        </Switch>
    );
    
    // Here we add the routes that are accessible for an authenticated user 
    if (this.props.isAuthenticated) {
        routes = (
            <Switch>
                <Route path="/checkout" component={Checkout} />
                <Route path="/orders" component={Orders} />
                <Route path="/logout" component={Logout}/>
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

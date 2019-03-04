import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

// Here we will create our out Logout class for handling end of authentication 
class Logout extends Component {
    // we need to include componentDidMount so that logout initiates at the start when rendering this component 
    // Then we will redirect the page back to the login
    componentDidMount() {
        this.props.onLogout();
    }
    render() {
        return <Redirect to="/"/>;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout);
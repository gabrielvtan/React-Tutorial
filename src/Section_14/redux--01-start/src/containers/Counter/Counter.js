import React, { Component } from 'react';
// connect is a hoc which we will use on the export 
import { connect } from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
    state = {
        counter: 0
    }

    counterChangedHandler = ( action, value ) => {
        switch ( action ) {
            case 'inc':
                this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
                break;
            case 'dec':
                this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
                break;
            case 'add':
                this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
                break;
            case 'sub':
                this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
                break;
        }
    }

    render () {
        return (
            // instead of 'this.state.counter' we will now pass 'this.props.ctr' as we are now using redux props 
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={() => this.counterChangedHandler( 'inc' )} />
                <CounterControl label="Decrement" clicked={() => this.counterChangedHandler( 'dec' )}  />
                <CounterControl label="Add 5" clicked={() => this.counterChangedHandler( 'add', 5 )}  />
                <CounterControl label="Subtract 5" clicked={() => this.counterChangedHandler( 'sub', 5 )}  />
            </div>
        );
    }
}

// here is the state we want to pass through redux 
// here we store instructions about how the state managed by redux should be mapped to props you can
// use in this container - this stores a function which expects the state stored in redux as the input
// and returns a JS object which is a map of props names and slices of the state stored in redux
// we reach out to the reducer file by state and get the value of counter as props 
const mapStateToProps = state => {
    return {
        ctr: state.counter
    };
};

// connect is a function which returns a hoc so it is not treated like withErrorHandler 
// we pass two arguments to connect 1) which part of state 2) which actions to dispatch  
export default connect(mapStateToProps)(Counter);
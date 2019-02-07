import React, { Component } from 'react';
import { connect } from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

import * as actionTypes from '../../store/actions';

class Counter extends Component {
    //Since we added redux, we can now remove state and the counterChangeHandler method within the Counter Component
    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 5" clicked={this.props.onAddCounter}  />
                <CounterControl label="Subtract 5" clicked={this.props.onSubtractCounter}  />
                <hr />
                {/* We now also convert this to an annonymous function in order to store the result of the counter  */}
                <button onClick={() => this.props.onStoreResult(this.props.ctr)}>Store Result</button>
                {/* Again here we are mapping the elements of storedResults to a list item */}
                <ul>
                    {this.props.storedResults.map(result => (
                        // we convert onClick to an annonymous function so that we can pass result.id to the redux in mapDispatchToProps
                        <li key={result.id} onClick={() => this.props.onDeleteResult(result.id)}>{result.value}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

// again we have to map all the redux state to props which we can use in react 
// and when we combine the reducers, we have to make sure we are accessing the correct props
// state.counter becomes state.ctr.counter 
const mapStateToProps = state => {
    return {
        ctr: state.ctr.counter,
        storedResults: state.res.results
    };
};

// Here I'll say which kind of actions do I want to dispatch 
// this will receive the dispatch function which will call dispatch.store behind the scenes 
// we import actions.js here and pass one the consts as each of the reducer cases 
const mapDispatchToProps = dispatch => {
    return {
        // this is an annonymous function which returns another function 
        onIncrementCounter: () => dispatch({type: actionTypes.INCREMENT}),
        onDecrementCounter: () => dispatch({type: actionTypes.DECREMENT}),
        onAddCounter: () => dispatch({type: actionTypes.ADD, value: 5}),
        onSubtractCounter: () => dispatch({type: actionTypes.SUBTRACT, value: -5}),
        // Here we create two new dispatch functions for submitting the results and pushing it to the array 
        // we don't have to pass counter as the payload because it is part of the initialState 
        onStoreResult: (result) => dispatch({type: actionTypes.STORE_RESULT, result: result}),
        // Here is the 2nd dispatch function which deletes a result from the array 
        // here we need to pass the id to the annonymous function 
        onDeleteResult: (id) => dispatch({type: actionTypes.DELETE_RESULT, resultId: id})
    };
};

// make sure to pass mapDispatchToProps as a 2nd argument in order to connect actions to given props 
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
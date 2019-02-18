import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../utility';

// HERE we use both the long-hand way and the using the utiity.js to make the reducer leaner 

const initialState = {
    counter: 0
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.INCREMENT:
            return updateObject(state, {counter: state.counter + 1})
        case actionTypes.DECREMENT:
            return updateObject(state, {counter: state.counter - 1})
        case actionTypes.ADD:
            return {
                ...state,
                counter: state.counter + action.val
            }
        case actionTypes.SUBTRACT:
            return updateObject(state, {counter: state.counter - action.val})
    }
    return state;
};

export default reducer;
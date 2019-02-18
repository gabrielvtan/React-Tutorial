import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../utility';

const initialState = {
    results: []
};

// Here it doesn't make sense to run the utility function on the updated array - need to parse the data first before sending it to redux
// In order to create more lean Switch statements, here we will create a function for updating the array for DELETE_RESULT
const deleteResult = (state, action) => {
    const updatedArray = state.results.filter(result => result.id !== action.resultElId);
    return updateObject(state, {results: updatedArray})
    // return {
    //     ...state,
    //     results: updatedArray
    // }
}

// Here we may also be able to add some logical transformation to the data being passed 
// recommended to put data transforming logic here in the reducer and not in the action creators 
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.STORE_RESULT:
            return updateObject(state,{results: state.results.concat({id: new Date(), value: action.result })});
            // return {
            //     ...state,
            //     results: state.results.concat({id: new Date(), value: action.result })
            // }
        // Here we have shortened the switch statement by putting the function outside of the switch statement 
        case actionTypes.DELETE_RESULT: return deleteResult(state, action)
    }
    return state;
};

export default reducer;
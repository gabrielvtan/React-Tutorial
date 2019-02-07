// HERE WE NOW SEPARATE THE REDUCER FILE IN TO TWO FILES TO BE COMBINED LATER 

// Here we now import the actions.js file - actionTypes is now a JS object which has all the props(consts) of actions.js 
import * as actionTypes from '../actions';

const initialState = {
    counter: 0
}

const reducer = (state = initialState, action) => {
    // here we have to include the action type which we want to apply to given click 
    // switch statements are one of the cleanest ways to pass reducers 
    // when you dispatch something, it goes through that single reducer you have, if something doesn't match a given case, it simply returns state
    // always make sure to distribute the old state over each case in order to immutably change the state
    switch (action.type) {
        case actionTypes.INCREMENT:
            return {
                ...state,
                counter: state.counter + 1
            }
        case actionTypes.DECREMENT:
            return {
                ...state,
                counter: state.counter - 1
            }
        case actionTypes.ADD:
            return {
                ...state,
                counter: state.counter + action.value
            }
        case actionTypes.SUBTRACT:
            return {
                ...state,
                counter: state.counter + action.value
            }
    }
    return state;
};

export default reducer;
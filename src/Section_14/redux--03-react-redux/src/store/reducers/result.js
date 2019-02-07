// HERE WE NOW SEPARATE THE REDUCER FILE IN TO TWO FILES TO BE COMBINED LATER 

// Here we now import the actions.js file - actionTypes is now a JS object which has all the props(consts) of actions.js 
import * as actionTypes from '../actions';

// we now create a new state 'results' as an array for storing the results of the counter 
const initialState = {
    results: []
}

const reducer = (state = initialState, action) => {
    // here we have to include the action type which we want to apply to given click 
    // switch statements are one of the cleanest ways to pass reducers 
    // when you dispatch something, it goes through that single reducer you have, if something doesn't match a given case, it simply returns state
    // always make sure to distribute the old state over each case in order to immutably change the state
    switch (action.type) {
        case actionTypes.STORE_RESULT:
            return {
                ...state,
                // concat() is an immutable way of updating an array by adding an item (state.counter)
                // we can also add objects to the array - which is advisable in this case as we are adding a new id 
                // SINCE WE NOW USE A GLOBAL REDUCER - WE HAVE TO NOW PASS ACTION AS A PAYLOAD TO PASS STATE BETWEEN REDUCERS 
                results: state.results.concat({id: new Date(), value: action.result})
            }
        case actionTypes.DELETE_RESULT:
            // you typically remove items from an array by getting the index of the item you want to remove 
            // this is acceptable, but not the most common way 
            // const id =2;
            // const newArray = [...state.results]
            // newArray.splice(id, 1)

            // filter() make a copy of the current array and takes a function as an input to be executed on each element of the array 
            // create a new array where the id does not match the id selected - this is in Counter
            const newArray = state.results.filter(result =>  result.id !== action.resultId);
            return {
                ...state,
                results: newArray
            }
    }
    return state;
};

export default reducer;
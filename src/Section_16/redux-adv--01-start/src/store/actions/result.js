import * as actionTypes from './actionsTypes';

// THE ONLY PLACE WHERE WE CAN EXECUTE ASYNCHRONOUS CODE IS IN OUR ACTION CREATOR 

// here we create asynchronous action creators which will dispatch actions created by syncrhonous ones
// only syncrhonous actions may be stored in the Store 
// If we ever want to transform the data received - the logic transformation would be included in here 
export const saveResult = (res) => {
    // const updatedResult = res * 2
    return {
        type: actionTypes.STORE_RESULT,
        result: res
    };
}

// here we will simulate the server call to demonstrate asynchrous code 
// here we have to return a function with the dispatch action due to redux thunk 
// have to remember to pass res as a payload for storing the result 
// redux thunk - in addition to dispatch, we can pass in another argument called getState which is a method to get the current state 
export const storeResult = (res) => {
    return (dispatch, getState) => {
        setTimeout(() => {
            // this can be done, but it is not recommended - write actions and reducers in a way that doesn't require to use getState()
            // const oldCounter = getState().ctr.counter; 
            // console.log(oldCounter); 
            dispatch(saveResult(res))
        }, 2000);
    }
};

export const deleteResult = (resElId) => {
    return {
        type: actionTypes.DELETE_RESULT,
        resultElId: resElId
    };
};
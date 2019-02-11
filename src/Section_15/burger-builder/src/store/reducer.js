import * as actionTypes from './actions';

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0 
    },
    totalPrice: 4
};

// We now move the ingredient prices to the reduce from the buildcontrols sos that the price of each ingredient may be passed through state 
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.5,
    bacon: 1
}


// now that we have moved the controls for adding/removing ingredients and also changing the prices, we can remove those methods from burger builder 
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                // here we are creating a new JS object
                ingredients: {
                    ...state.ingredients, 
                    // We want to now override a given ingredient and need to pass that as a payload object 
                    // this isn't an array, but you are now able to pass in a variable for a desired property name 
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                // so now we are adding totalPrice as a payload so that we dont have to create a new action type 
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                // we do the same things 
                ...state,
                ingredients: {
                    ...state.ingredients,  
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };
        default:
            return state;
    }

}

export default reducer;
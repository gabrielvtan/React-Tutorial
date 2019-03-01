import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility'; // remember that named exports need to be wrapped in curly brackets

// we have to now pass error as its own state because we are no longer setting its state in burger builder
// HERE we now add a state for building so that we can correctly redirect the user depending on whether they 
// ordered the burger prior to logging in. Building will be set to true whenever ingredients are added 
const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
};

// we can make the switch statement short be extracting the logic from our cases into their own functions 
const addIngredient = (state, action) => {
    // Here we will include the utility function to make the switch statements leaner
    // updated ingredient has to be an object as that is what the utility function is expecting to receive 
    // HERE we have to update the building state to true 
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1}
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
        return updateObject(state, updatedState);
};

// Lets add remove ingredient as well
const removeIngredient = (state, action) => {
    // Here we do the exact same thing - however we have to change the variables so that they are not the same as the other cases
    // HERE we have to update the building state to true 
    const updatedIng = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1}
    const updatedIngs = updateObject(state.ingredients, updatedIng);
    const updatedSt = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
        return updateObject(state, updatedSt);
};

const setIngredient = (state, action) => {
    return updateObject(state, {
        // Here we instead of dynamically getting the incredients from firebase, we will hardcode the order of ingredients
        // ingredients: action.ingredients,
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        // Here we will add an update to total price whenever a new order is started        
        // include error false here to eliminate the error message once the ingredients pop up 
        // HERE we have to update the building state to FALSE
        totalPrice: 4,
        error: false,
        building: false
    });
};

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, {error:true});
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
        case actionTypes.ADD_INGREDIENT: return addIngredient (state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action); 
        case actionTypes.SET_INGREDIENTS: return setIngredient(state, action); 
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state,action);
        default: return state;
    }

}

export default reducer;
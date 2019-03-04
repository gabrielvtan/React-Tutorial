import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};

// Here we will create the synchronous code which will be passed to the initIngredients action 
export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
};

// Now we have to create an action for errors 
export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    };
};

// here let us create an asynchronous action for getting the ingredients from the server 
// as a reminder, you are able to use dispatch as an argument because of 'thunk' from 'redux-thunk'
// we took the axios function from BurgerBuilder Container 
export const initIngredients = () => {
    return dispatch => {
        axios.get('https://burgerbuilder-a39e5.firebaseio.com/ingredients.json')
        .then(response => {
            dispatch(setIngredients(response.data));
        })
        .catch(error => {
            dispatch(fetchIngredientsFailed(error))
        });
    };
};
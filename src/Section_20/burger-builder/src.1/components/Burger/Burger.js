import React from 'react';

// this is a React HOC which inject thse special props into any component
// import { withRouter} from 'react-router-dom';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    // console.log(props);
    // Object.keys returns the keys of a given array which we may then map - this allows us to execute a given function on each key of the array
    // Here we then return an array of values for each of the given keys (ingredients) by mapping again over the array to return the index
    // this thus allows us to create a unique key per ingredient added - thus we we transformed ingredients which were initially key:value pairs 
    // into an array of ingredients
    // THIS IS THE LOGIC USED FOR THE ORDER PAGE TO PARSE OUT THE INGREDIENTS PER ORDER
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />;
            });
        })
        .reduce((arr, el) =>{
            return arr.concat(el)
        }, []); // this is a built in JS function which allows us to reduce a series of arrays into one single array 
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients</p>
    }
    
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
                {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

// export default withRouter(burger);
export default burger;
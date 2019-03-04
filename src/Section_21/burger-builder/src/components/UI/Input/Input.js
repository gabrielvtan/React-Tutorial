import React from 'react';

import classes from './Input.css';

// Here we are creating customized input elements for our app 
const input = (props) => {
    let inputElement = null;

    // here is how we make the classes more dynamic - we then pass inputClasses into classname instead of classes.Class
    const inputClasses = [classes.InputElement];

    // Here we now include the invalid input check and include a props.shouldValidate property - which then needs to get added back to the ContactData
    // and also include a check for whether the input form was touched 
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    // this swtich statement allows use to change the inputElement based on the inputType
    // {...props} alows us to add whatever css classes as props to a given inputElement 
    // we will use the wrapper to pass the correct normal html attributes to an inputElement 
    // we then have to distribute the props of the elementConfig to pass to the input form 
    // we now also have to add another component to each input element for the validation feedback 
    switch(props.elementType) {
        case('input'): 
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value} 
                onChange={props.changed}/>;
            break;
        case ('textarea'):
            inputElement = <textarea 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value} 
                onChange={props.changed}/>;
            break;
        // We will create our options in between the select tags
        // elementConfig is not necessary becuase we are simply receiving options so we now have to map the options 
        // we map the options here so that it will display dynamically on the dropdown menu 
        case ('select'):
            inputElement = (
            <select
                className={inputClasses.join(' ')} 
                value={props.value}
                onChange={props.changed}>
                {props.elementConfig.options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.displayValue}
                    </option>
                ))}
            </select>
            );
            break;

        default: 
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value} 
                onChange={props.changed}/>;
    }
    
    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input; 
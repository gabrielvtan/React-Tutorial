// Here we are creating a utility file in order to make a our reducer code leaner 
// We now move it to a shared folder so that the utility function may be used throughout the application 
export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
};

// HERE we will now add the checkValidity method as it is used in contact data and authorization
// We have to convert the method in an arrow function in order to export it 
export const checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
        // here we set isValid equal to the value comparision, i.e., isValid should be equal, if it's not equal to, an empty string 
        // use value.trim to remove any whitespaces at the beginning or end. 
        isValid = value.trim() !== '' && isValid;
    }

    // we can also add additional rules for the input form 
    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.minLength && isValid
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }

    return isValid;
}

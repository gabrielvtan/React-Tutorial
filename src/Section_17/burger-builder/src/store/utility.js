// Here we are creating a utility file in order to make a our reducer code leaner 
export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
};
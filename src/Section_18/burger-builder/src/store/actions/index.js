// Once the reducer has been incorporated into a given action, the action is then exported here 
// and is imported into a given container 

export {
    addIngredient,
    removeIngredient,
    initIngredients
} from './burgerBuilder';

export {
    purchaseBurger,
    purchaseInit,
    fetchOrders
} from './order';

export {
    auth,
    logout,
    setAuthRedirectPath,
    authCheckState
} from './auth';

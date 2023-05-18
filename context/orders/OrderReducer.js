import {
    SELECT_CLIENT,
    SELECT_PRODUCTS,
    PRODUCTS_QUANTITY,
    UPDATE_TOTAL
} from '../../types';

export default (state, action) => {
    switch (action.type) {
    case SELECT_CLIENT:        
        return {
            ...state,
            client: action.payload
        };
    
    case SELECT_PRODUCTS:   
        return {
            ...state,
            products: action.payload
        };

    case PRODUCTS_QUANTITY:
        return {
            ...state,
            products: state.products.map(current => current.id === action.payload.id ? current = action.payload : current)
        };

    case UPDATE_TOTAL:
        return {
            ...state,
            total: state.products?.reduce((acc, product) => acc += product.price * product.quantity, 0)
        };

    default:
        return state;
    }
};
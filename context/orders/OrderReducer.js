import {
    SELECT_CLIENT,
    SELECT_PRODUCTS,
    PRODUCTS_QUANTITY
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
        break;

    default:
        return state;
    }
};
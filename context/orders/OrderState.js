import React, { useReducer } from "react";
import OrderContext from "./OrderContext";
import OrderReducer from "./OrderReducer";

import {
    SELECT_CLIENT,
    SELECT_PRODUCTS,
    PRODUCTS_QUANTITY,
    UPDATE_TOTAL
} from '../../types';

const OrderState = ({ children }) => {
    const initialState = {
        client: {},
        products: [],
        total: 0
    }

    const [ state, dispatch ] = useReducer(OrderReducer, initialState)

    const addClient = client => {
        dispatch({
            type: SELECT_CLIENT,
            payload: client
        })
    }

    const addProducts = productsSelected => {
        let newState;
        if(state.products?.length) {
            newState = productsSelected.map( prod => {
                const newObj = state.products.find(el => el.id === prod.id);
                return {...prod, ...newObj}
            })
        } else {
            newState = productsSelected;
        }

        dispatch({
            type: SELECT_PRODUCTS,
            payload: newState
        })
    }

    const updateQty = newProduct => {
        dispatch({
            type: PRODUCTS_QUANTITY,
            payload: newProduct
        })
    }

    const updateTotal = () => {
        dispatch({
            type: UPDATE_TOTAL,
        })
    }

    return (
        <OrderContext.Provider value={{
            client: state.client,
            products: state.products,
            total: state.total,
            addClient,
            addProducts,
            updateQty,
            updateTotal
        }}>
            { children }
        </OrderContext.Provider>
    );
}

export default OrderState;

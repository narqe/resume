import React, { useEffect, useState, useContext } from 'react';
import { useQuery } from '@apollo/client';
import Select from 'react-select';
import { GET_PRODUCTS } from '../../GraphQL/Queries';
import OrderContext from '../../context/orders/OrderContext';

const AssignProducts = () => {
    const [ productsSelected, setProductsSelected ] = useState(null);
    const { data, loading } = useQuery(GET_PRODUCTS);
    const orderContext = useContext(OrderContext);
    const { addProducts } = orderContext;

    useEffect(() => {
        addProducts(productsSelected);
    }, [productsSelected])

    const onChangeSelected = (selected) => {
        setProductsSelected(selected)
    }

    if(loading) return ('Cargando...');

    return (
        <>
            <label className="block text-gray-700 text-sm font-bold mb-2">
                Asignar productos al pedido
            </label>
            <Select
                className="appearance-none rounder w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                options={data.getAllProducts}
                getOptionValue={options => options.id }
                getOptionLabel={options => `${options.name} (${options.quantity} disponibles)` }
                onChange={selected => onChangeSelected(selected)}
                placeholder={'Selecciona los productos'}
                noOptionsMessage={() => 'No hay productos para seleccionar'}
                required={true}
                isMulti={true}
            />
        </>
    )
}

export default AssignProducts;
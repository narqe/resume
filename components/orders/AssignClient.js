import React, { useEffect, useState, useContext } from 'react';
import { useQuery } from '@apollo/client';
import Select from 'react-select';
import { GET_CLIENT_SELLERS } from '../../GraphQL/Queries';
import OrderContext from '../../context/orders/OrderContext';

const AssignClient = () => {
    const [ clientsSelected, setClientsSelected ] = useState(null);
    const { data, loading } = useQuery(GET_CLIENT_SELLERS);
    const orderContext = useContext(OrderContext);
    const { addClient } = orderContext;

    useEffect(() => {
        addClient(clientsSelected);
    }, [clientsSelected])

    const onChangeSelected = (selected) => {
        setClientsSelected(selected)
    }

    if(loading) return ('Cargando...');

    return (
        <>
            <label className="block text-gray-700 text-sm font-bold mb-2">
                Asignar un cliente al pedido
            </label>
            <Select
                className="appearance-none rounder w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                options={data.getClientsVendedor}
                getOptionValue={options => options.id }
                getOptionLabel={options => options.name }
                onChange={selected => onChangeSelected(selected)}
                placeholder={'Selecciona un cliente'}
                noOptionsMessage={() => 'No hay clientes para seleccionar'}
                required={true}
            />
        </>
    )
}

export default AssignClient;
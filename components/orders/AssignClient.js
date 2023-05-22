import React, { useEffect, useState, useContext } from 'react';
import { useQuery } from '@apollo/client';
import Select from 'react-select';
import { GET_CLIENT_SELLERS } from '../../GraphQL/Queries/Client';
import OrderContext from '../../context/orders/OrderContext';
import Loading from '../shared/Loading';
import { useTranslation } from 'react-i18next';

const AssignClient = () => {
    const [ clientsSelected, setClientsSelected ] = useState(null);
    const { data, loading } = useQuery(GET_CLIENT_SELLERS);
    const orderContext = useContext(OrderContext);
    const { t } = useTranslation(); 
    const { addClient } = orderContext;

    useEffect(() => {
        addClient(clientsSelected);
    }, [clientsSelected])

    const onChangeSelected = (selected) => {
        setClientsSelected(selected)
    }

    if(loading) return (<Loading smallSize={true} />);

    return (
        <>
            <label className="block text-gray-700 text-sm font-bold mb-2">
                {t('LABELS.ASSIGN_CLIENT')}
            </label>
            <Select
                className="appearance-none rounder w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                options={data.getClientsVendedor}
                getOptionValue={options => options.id }
                getOptionLabel={options => options.name }
                onChange={selected => onChangeSelected(selected)}
                placeholder={t('PLACEHOLDERS.ASSIGN_CLIENT')}
                noOptionsMessage={() => t('EMPTY.ASSIGN_CLIENT')}
                required={true}
            />
        </>
    )
}

export default AssignClient;
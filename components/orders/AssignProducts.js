import React, { useEffect, useState, useContext } from 'react';
import { useQuery } from '@apollo/client';
import Select from 'react-select';
import { GET_PRODUCTS } from '@graphql/Queries/Product';
import OrderContext from '@context/orders/OrderContext';
import Loading from '@components/shared/Loading';
import { useTranslation } from 'react-i18next';

const AssignProducts = () => {
    const [ productsSelected, setProductsSelected ] = useState(null);
    const { data, loading } = useQuery(GET_PRODUCTS);
    const orderContext = useContext(OrderContext);
    const { t } = useTranslation();
    const { addProducts, updateTotal } = orderContext;

    useEffect(() => {
        addProducts(productsSelected);
        updateTotal();
    }, [productsSelected])

    const onChangeSelected = (selected) => {
        setProductsSelected(selected)
    }

    if(loading) return (<Loading smallSize={true} />);

    return (
        <>
            <label className="block text-gray-700 text-sm font-bold mb-2">
                {t('LABELS.ASSIGN_PRODUCTS')}
            </label>
            <Select
                className="appearance-none rounder w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                options={data.getAllProducts}
                getOptionValue={options => options.id }
                getOptionLabel={options => `${options.name} (${options.quantity} disponibles)` }
                onChange={selected => onChangeSelected(selected)}
                isOptionDisabled={options => options.quantity === 0}
                placeholder={t('PLACEHOLDERS.ASSIGN_PRODUCTS')}
                noOptionsMessage={() => t('EMPTY.ASSIGN_PRODUCTS')}
                required={true}
                isMulti={true}
            />
        </>
    )
}

export default AssignProducts;
import React, { useContext } from 'react'
import OrderContext from '@context/orders/OrderContext';
import { useTranslation } from 'react-i18next';
import ProductSummary from '@components/orders/ProductSummary';

const SummaryOrder = () => {
    const { t } = useTranslation()
    const orderContext = useContext(OrderContext);
    const { products } = orderContext;

    return (
        <div className='mt-5'>{
            products?.length 
                ? products.map(product => <ProductSummary key={product.id} product={product} />) 
                : t('EMPTY.PRODUCTS_SELECTED')
            }
        </div>
    )
}

export default SummaryOrder;
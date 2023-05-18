import React, { useContext } from 'react'
import OrderContext from '../../context/orders/OrderContext';
import ProductSummary from './ProductSummary';

const SummaryOrder = () => {
    const orderContext = useContext(OrderContext);
    const { products } = orderContext;

    return (
        <div className='mt-5'>{
            products?.length ? 
                products.map(product => <ProductSummary key={product.id} product={product} />) : 
                'No hay productos seleccionados' 
            }
        </div>
    )
}

export default SummaryOrder;
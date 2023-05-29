import React, { useContext } from 'react'
import OrderContext from '@context/orders/OrderContext';
import CurrencyNumber from '@components/shared/CurrencyNumber';
import { useTranslation } from 'react-i18next';

const Total = () => {
    const { t } = useTranslation();
    const orderContext = useContext(OrderContext);
    const { total } = orderContext;

    return (
        <div className='flex mt-5 items-center justify-between bg-gray-100 p-3'>
            <h2 className='text-gray-800 text-lg'>{t('LABELS.TOTAL_TO_PAY')}:</h2>
            <CurrencyNumber value={total || 0} />
        </div>
    )
}

export default Total;
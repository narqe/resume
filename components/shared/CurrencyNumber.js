import React from 'react';

const CurrencyNumber = ({ value, lang = 'es-AR', currency = "ARS" }) => {
    return new Intl.NumberFormat(lang, {
        style: 'currency',
        currency: currency
    }).format(value);
}

export default CurrencyNumber
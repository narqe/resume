import React from 'react'
import { useTranslation } from 'react-i18next';

const getDate = (createdOn) => {
    const dateAsInt = parseInt(createdOn);
    const date = new Date(dateAsInt).getDate();
    const month = new Date(dateAsInt).getMonth();
    const year = new Date(dateAsInt).getFullYear();

    const fullDate = `${date}/${month}/${year}`

    return fullDate;
}

const Metadata = ({ author, createdOn }) => {
    const { t } = useTranslation();

    return (
        <div>
            <span className='p-5 text-sm text-ligth text-gray-400 uppercase'>
                {`${t('LABELS.AUTHOR')}: ${author}`} - { getDate(createdOn) } </span>
        </div>
    )
}

export default Metadata
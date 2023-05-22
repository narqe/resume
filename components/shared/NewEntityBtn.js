import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { BsPlusCircle } from 'react-icons/bs'

const NewEntityBtn = ({ link, buttonLabel }) => {
    const { t } = useTranslation()
    return (
        <Link href={link} className='flex justify-end'>
            <span className='inline-flex leading-4 gap-3 bg-green-800 py-2 px-5 mt-2 text-white rounded text-sm hover:bg-green-600 uppercase font-bold'>
            <BsPlusCircle />
            { t(`BUTTONS.${buttonLabel}`) }
            </span>
        </Link>
    )
}

export default NewEntityBtn
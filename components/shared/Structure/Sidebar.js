import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import MenuLi from '@components/shared/Structure/MenuLi';
import useWindowDimensions from '@hooks/useWindowDimensions';
import Link from 'next/link';

const Sidebar = () => {
    const [ hamburgerClass, setHamburgerClass ] = useState('hidden');
    const [ menuClass, setMenuClass ] = useState('flex-col justify-between');
    const { t } = useTranslation();
    const { height, width } = useWindowDimensions();

    const toogleMenu = () => {
        if (hamburgerClass === 'hidden') {
            setHamburgerClass('flex-col');
        } else {
            setHamburgerClass('hidden');
        }
    }

    useEffect(() => {
        if (height >= 470 && width >= 1440) {
            setMenuClass('flex-col justify-between')
        } else {
            setHamburgerClass('flex-col');
        }

    }, [height, width])

    return (
        <aside className={`${menuClass} bg-green-900 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5`}>
            <div className="inline-flex justify-start lg:w-full w-2/4">
                <p className="text-white text-2xl">
                    <Link href="/admin/">{t('PAGE_TITLE')}</Link>
                </p>
            </div>
            <div className="inline-flex justify-end lg:w-full w-2/4">
                <div className="lg:hidden">
                    <button className="navbar-burger text-white p-3" onClick={() => toogleMenu()}>
                        <svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div className={`${hamburgerClass} w-full`}>
                <nav className="mt-5 list-none">
                    <MenuLi pathname={'/'} label={t('LAYOUT_TITLES.WEB')} />
                    <MenuLi pathname={'/admin/'} label={t('LAYOUT_TITLES.CLIENTS')} />
                    <MenuLi pathname={'/admin/orders'} label={t('LAYOUT_TITLES.ORDERS')} />
                    <MenuLi pathname={'/admin/products'} label={t('LAYOUT_TITLES.PRODUCTS')} />
                    <MenuLi pathname={'/admin/blog/'} label={t('LAYOUT_TITLES.BLOG')} />
                </nav>
                <div className='mt-10'>
                    <p className="text-white font-bold text-lg">
                        {t('LAYOUT_TITLES.STADISTICS')}
                    </p>
                </div>
                <nav className="mt-5 list-none">
                    <MenuLi pathname={'/admin/best-sellers/'} label={t('LAYOUT_TITLES.BEST_SELLERS')} />
                    <MenuLi pathname={'/admin/best-clients'} label={t('LAYOUT_TITLES.BEST_CLIENTS')} />
                </nav>
            </div>
        </aside>
    )
}

export default Sidebar;
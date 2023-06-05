import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useWindowDimensions from '@hooks/useWindowDimensions';
import MenuLi from '@components/shared/Structure/MenuLi';

const NavMenu = () => {
    const [ hamburgerClass, setHamburgerClass ] = useState('hidden');
    const [ menuClass, setMenuClass ] = useState('lg:flex lg:flex-row flex-col justify-between');
    const { t } = useTranslation();
    const { height, width } = useWindowDimensions();
    const [ hasToken, setHasToken ] = useState();

    const toogleMenu = () => {
        if (hamburgerClass === 'hidden') {
            setHamburgerClass('lg:flex lg:flex-row flex-col');
        } else {
            setHamburgerClass('hidden');
        }
    }

    useEffect(() => {
        if (height >= 470 && width >= 1440) {
            setMenuClass('lg:flex lg:flex-row flex-col justify-between')
        } else {
            setMenuClass('lg:flex lg:flex-row flex-col justify-between')
        }

    }, [height, width])
    
    if (typeof window !== "undefined") {
        useEffect(() => {
            if(localStorage.getItem('token')) {
                setHasToken(true)
            } else {
                setHasToken(false);
            }
        }, [hasToken])
    }

    return (
        <div className={`${menuClass} bg-green-900 w-full py-5 px-12`}>
            <div className='inline-flex justify-start lg:w-full w-2/4'>
                <p className="text-white lg:text-2xl">
                    <Link href="/">
                        {t('PAGE_TITLE')}
                    </Link>
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
            <nav className={`${hamburgerClass} lg:flex list-none w-full justify-end lg:text-left text-center`}>
                <MenuLi pathname={'/'} label={t('LAYOUT_TITLES.HOME')} />
                <MenuLi pathname={'/music'} label={t('LAYOUT_TITLES.MUSIC')} />
                <MenuLi pathname={'/cinema'} label={t('LAYOUT_TITLES.CINEMA')} />
                <MenuLi pathname={'#'} label={t('LAYOUT_TITLES.SERIES')} />
                <MenuLi pathname={'#'} label={t('LAYOUT_TITLES.BOOKS')} />
                <MenuLi pathname={'#'} label={t('LAYOUT_TITLES.GAMES')} />
                <MenuLi pathname={'#'} label={t('LAYOUT_TITLES.EVENTS')} />
                { hasToken
                    ? <MenuLi pathname={'/admin/'} label={t('LAYOUT_TITLES.ADMIN')} />
                    : <MenuLi pathname={'/admin/login'} label={t('LAYOUT_TITLES.LOGIN')} />
                }
            </nav>
        </div>
    )
}

export default NavMenu;
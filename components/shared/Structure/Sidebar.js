import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

const Sidebar = () => {
    const router = useRouter();
    const { t } = useTranslation();

    return (
        <aside className="bg-green-900 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
            <div>
                <p className="text-white text-2xl">
                    {t('PAGE_TITLE')}
                </p>
            </div>
            <nav className="mt-5 list-none">
                <li className={router.pathname === "/admin/" ? "bg-yellow-700 p-2" : "p-2"}>
                    <Link href="/admin/">
                        <span className="text-white block">
                            {t('LAYOUT_TITLES.CLIENTS')}
                        </span>
                    </Link>
                </li>
                <li className={router.pathname === "/admin/orders/" ? "bg-yellow-700 p-2" : "p-2"}>
                    <Link href="/admin/orders">
                        <span className="text-white block">
                            {t('LAYOUT_TITLES.ORDERS')}
                        </span>
                    </Link>
                </li>
                <li className={router.pathname === "/admin/products/" ? "bg-yellow-700 p-2" : "p-2"}>
                    <Link href="/admin/products">
                        <span className="text-white block">
                            {t('LAYOUT_TITLES.PRODUCTS')}
                        </span>
                    </Link>
                </li>
                <li className={router.pathname === "/admin/blog/" ? "bg-yellow-700 p-2" : "p-2"}>
                    <Link href="/admin/blog">
                        <span className="text-white block">
                            {t('LAYOUT_TITLES.BLOG')}
                        </span>
                    </Link>
                </li>
            </nav>
            <div className='mt-10'>
                <p className="text-white font-bold text-lg">
                    {t('LAYOUT_TITLES.STADISTICS')}
                </p>
            </div>
            <nav className="mt-5 list-none">
                <li className={router.pathname === "/admin/best-sellers/" ? "bg-yellow-700 p-2" : "p-2"}>
                    <Link href="/admin/best-sellers">
                        <span className="text-white block">
                            {t('LAYOUT_TITLES.BEST_SELLERS')}
                        </span>
                    </Link>
                </li>
                <li className={router.pathname === "/admin/best-clients" ? "bg-yellow-700 p-2" : "p-2"}>
                    <Link href="/admin/best-clients">
                        <span className="text-white block">
                            {t('LAYOUT_TITLES.BEST_CLIENTS')}
                        </span>
                    </Link>
                </li>
            </nav>
        </aside>
    )
}

export default Sidebar;
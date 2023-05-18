import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';

const Sidebar = () => {
    const router = useRouter();

    return (
        <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
            <div>
                <p className="text-white text-2xl">CRM CLIENTES</p>
            </div>
            <nav className="mt-5 list-none">
                <li className={router.pathname === "/" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/">
                        <span className="text-white block">Client</span>
                    </Link>
                </li>
                <li className={router.pathname === "/orders" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/orders">
                        <span className="text-white block">Orders</span>
                    </Link>
                </li>
                <li className={router.pathname === "/products" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/products">
                        <span className="text-white block">Products</span>
                    </Link>
                </li>
            </nav>
            <div className='mt-10'>
                <p className="text-white font-bold text-lg">Graphs</p>
            </div>
            <nav className="mt-5 list-none">
                <li className={router.pathname === "/best-sellers" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/best-sellers">
                        <span className="text-white block">Best Sellers</span>
                    </Link>
                </li>
                <li className={router.pathname === "/best-clients" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/best-clients">
                        <span className="text-white block">Mejores Clientes</span>
                    </Link>
                </li>
            </nav>
        </aside>
    )
}

export default Sidebar;
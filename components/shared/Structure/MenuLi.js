import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'

const MenuLi = ({ pathname = '#', label }) => {
    const router = useRouter();
    return (
        <li className={router.pathname === pathname ? "bg-yellow-700 py-1 px-5 rounded-full" : "py-1 px-5 rounded-full"}>
            <Link href={pathname}>
                <span className="text-white block">
                    { label }
                </span>
            </Link>
        </li>
    )
}

export default MenuLi
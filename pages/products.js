import React from 'react';
import Layout from '../components/shared/Layout';
import Link from 'next/link';
import CustomTable from '../components/shared/CustomTable';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../GraphQL/Queries/Product';
import { useTranslation } from 'react-i18next';
import { BsPlusCircle } from 'react-icons/bs';

const Products = () => {
    const { data, loading, error } = useQuery(GET_PRODUCTS);
    const { t } = useTranslation();

    return (
        <Layout title={ t('LAYOUT_TITLES.PRODUCTS') }>
            <Link href="/newproduct">
                <span className='inline-flex leading-4 justify-center align-middle gap-3 bg-blue-800 py-2 px-5 mt-2 text-white rounded text-sm hover:bg-blue-600 uppercase font-bold'>
                    <BsPlusCircle />
                    { t('BUTTONS.NEW_PRODUCT') }
                </span>
            </Link>
            <CustomTable data={data?.getAllProducts} ctx="Product" loading={loading} error={error} />
        </Layout>
    )
}

export default Products;
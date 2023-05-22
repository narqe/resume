import React from 'react';
import Layout from '../components/shared/Layout';
import Link from 'next/link';
import CustomTable from '../components/shared/CustomTable';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../GraphQL/Queries/Product';

const Products = () => {
    const { data, loading, error } = useQuery(GET_PRODUCTS);

    return (
        <Layout title="Productos">
            <Link href="/newproduct">
                <span className='bg-blue-800 py-2 px-5 mt-2 text-white rounded text-sm hover:bg-blue-600 uppercase font-bold'>
                New Product
                </span>
            </Link>
            <CustomTable data={data?.getAllProducts} ctx="Product" loading={loading} error={error} />
        </Layout>
    )
}

export default Products;
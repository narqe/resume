import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import CustomTable from '../components/CustomTable';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../GraphQL/Queries';

const Products = () => {
    const { data, loading } = useQuery(GET_PRODUCTS)

    if(loading) return null;

    return (
        <Layout title="Productos">
            <Link href="/newproduct">
                <span className='bg-blue-800 py-2 px-5 mt-2 text-white rounded text-sm hover:bg-blue-600 uppercase font-bold'>
                New Product
                </span>
            </Link>
            <CustomTable data={data.getAllProducts} ctx="Product" />
        </Layout>
    )
}

export default Products;
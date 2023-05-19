import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useQuery } from '@apollo/client';
import { TOP_SALESMAN } from '../GraphQL/Queries';

const BestSellers = () => {
    const { data, loading, error, startPolling, stopPolling } = useQuery(TOP_SALESMAN);

    useEffect(() => {
        startPolling(1000);
        return () => stopPolling();
    }, [startPolling, stopPolling])
    
    if(loading) return ('Cargando...');

    const { getTopSalesman } = data;

    const bestSalesmanGraphic = [];
    getTopSalesman.map((salesman, i) => {
        bestSalesmanGraphic[i] = {
            ...salesman.salesman[0],
            total: salesman.total
        }
    })

    return (
        <Layout title="Best Sellers">
        <ResponsiveContainer width={'99%'} height={550}>
            <BarChart
                width={1024}
                height={500}
                data={bestSalesmanGraphic}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={'name'} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey={'total'} fill="#3182ce" />
            </BarChart>
          </ResponsiveContainer>
        </Layout>
    )
}

export default BestSellers;

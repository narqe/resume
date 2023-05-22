import React, { useEffect } from 'react';
import Layout from '../components/shared/Layout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useQuery } from '@apollo/client';
import { TOP_SALESMAN } from '../GraphQL/Queries/TopPages';
import Loading from '../components/shared/Loading';
import { useTranslation } from 'react-i18next';

const BestSellers = () => {
    const { data, loading, error, startPolling, stopPolling } = useQuery(TOP_SALESMAN);
    const { t } = useTranslation();

    useEffect(() => {
        startPolling(1000);
        return () => stopPolling();
    }, [startPolling, stopPolling])

    const bestSalesmanGraphic = [];
    data?.getTopSalesman.map((salesman, i) => {
        bestSalesmanGraphic[i] = {
            ...salesman.salesman[0],
            total: salesman.total
        }
    })

    return (
        <Layout title={t('LAYOUT_TITLES.BEST_CLIENTS')}>
            { loading 
                ? <Loading />
                : error 
                    ? 'Error component'
                    :   <ResponsiveContainer width={'99%'} height={550}>
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
            }
        </Layout>
    )
}

export default BestSellers;

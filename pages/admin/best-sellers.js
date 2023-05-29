import React, { useEffect } from 'react';
import Layout from '@components/layouts/Layout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useQuery } from '@apollo/client';
import { TOP_SALESMAN } from '@graphql/Queries/TopPages';
import Loading from '@components/shared/Loading';
import { useTranslation } from 'react-i18next';
import ErrorCustomTableResults from '@components/shared/ErrorCustomTableResults';

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
                    ?   <ErrorCustomTableResults />
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
                                <Bar dataKey={'total'} fill="#b45308"  />
                            </BarChart>
                        </ResponsiveContainer>
            }
        </Layout>
    )
}

export default BestSellers;

import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useQuery } from '@apollo/client';
import { TOP_CLIENTS } from '../GraphQL/Queries';

const BestClients = () => {
    const { data, loading, error, startPolling, stopPolling } = useQuery(TOP_CLIENTS);

    if(loading) return ('Cargando...');

    const { getTopClients } = data;

    const bestClientsGraphic = [];
    getTopClients.map((client, i) => {
        bestClientsGraphic[i] = {
            ...client.client[0],
            total: client.total
        }
    })

    useEffect(() => {
        startPolling(1000);
        stopPolling();
    }, [startPolling, stopPolling])

    return (
        <Layout title="Best Clients">
            <ResponsiveContainer width={'99%'} height={550}>
                <BarChart
                    width={1024}
                    height={500}
                    data={bestClientsGraphic}
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

export default BestClients;

import React, { useEffect } from 'react';
import Layout from '../components/shared/Layout';
import { useQuery } from '@apollo/client';
import { GET_CLIENT_SELLERS } from '../GraphQL/Queries/Client';
import CustomTable from '../components/shared/CustomTable';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import NewEntityBtn from '../components/shared/NewEntityBtn';

const Index = () => {
  const { t } = useTranslation();
  const { data, loading, error } = useQuery(GET_CLIENT_SELLERS);
  const router = useRouter()

  useEffect(() => {
    if (!localStorage.getItem('token')) {
        router.push("/login")
    }
  }, [])

  return(
    <Layout title={ t('LAYOUT_TITLES.CLIENTS') }>
      <NewEntityBtn link={'/newclient'} buttonLabel={'NEW_CLIENT'} />
      <CustomTable 
        data={data?.getClientsVendedor} 
        loading={loading}
        error={error} 
        ctx="Client" 
      />
    </Layout>
  )
}

export default Index;

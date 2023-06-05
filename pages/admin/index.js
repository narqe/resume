import React, { useEffect } from "react";
import Layout from '@components/layouts/Layout';
import { useQuery } from '@apollo/client';
import CustomTable from '@components/shared/CustomTable';
import { useTranslation } from 'react-i18next';
import NewEntityBtn from '@components/shared/Inputs/NewEntityBtn';
import { GET_CLIENT_SELLERS } from '@graphql/Queries/Client';

const Index = () => {
  const { t } = useTranslation();
  const { data, loading, error } = useQuery(GET_CLIENT_SELLERS);

  return (
    <Layout title={ t('LAYOUT_TITLES.CLIENTS') }>
      <NewEntityBtn link={'/admin/newclient'} buttonLabel={'NEW_CLIENT'} />
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

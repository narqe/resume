import React, { useEffect } from 'react';
import Layout from '../components/shared/Layout';
import { useQuery } from '@apollo/client';
import { GET_CLIENT_SELLERS } from '../GraphQL/Queries/Client';
import Link from 'next/link';
import CustomTable from '../components/shared/CustomTable';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { BsPlusCircle } from 'react-icons/bs';

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
      <Link href="/newclient">
        <span className='inline-flex leading-4 gap-3 bg-blue-800 py-2 px-5 mt-2 text-white rounded text-sm hover:bg-blue-600 uppercase font-bold'>
          <BsPlusCircle />
          { t('BUTTONS.NEW_CLIENT') }
        </span>
      </Link>
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

import Layout from '../components/Layout';
import { useQuery } from '@apollo/client';
import { GET_CLIENT_SELLERS } from '../GraphQL/Queries';
import { useRouter } from 'next/router';
import Link from 'next/link';
import CustomTable from '../components/CustomTable';

const Index = () => {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_CLIENT_SELLERS);

  if (loading) {
    return (
      'Cargando...'
    );
  }

  return (
    <Layout title="Clientes">
      <Link href="/newclient">
        <span className='bg-blue-800 py-2 px-5 mt-2 text-white rounded text-sm hover:bg-blue-600 uppercase font-bold'>
          New Client
        </span>
      </Link>
      <CustomTable data={data.getClientsVendedor} ctx="Client" />
    </Layout>
  )
}

export default Index;

import Layout from '../components/Layout';
import { useQuery } from '@apollo/client';
import { GET_CLIENT_SELLERS } from '../GraphQL/Queries';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Index = () => {
  const router = useRouter();
  const { data, loading } = useQuery(GET_CLIENT_SELLERS);

  if (loading) return 'Cargando...';
  if (!data.getClientsVendedor) {
    return router.push('/login');
  }

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Clientes</h1>
      <Link href="/newclient">
        <span className='bg-blue-800 py-2 px-5 mt-2 inline-block text-white rounded text-sm hover:bg-blue-600 mb-3 uppercase font-bold'>
          New Client
        </span>
      </Link>
      <table className='table-auto shadow-md mt-10 w-full w-lg'>
        <thead className='bg-gray-800'>
          <tr className='text-white'>
            <th className='w-1/5 py-2'>Nombre</th>
            <th className='w-1/5 py-2'>Empresa</th>
            <th className='w-1/5 py-2'>Email</th>
          </tr>
        </thead>
        <tbody className='bg-white'>
          { data.getClientsVendedor.map(client => (
              <tr key={client.id}>
                <td className='border px-4 py-2'>{client.name} {client.lastname}</td>
                <td className='border px-4 py-2'>{client.company}</td>
                <td className='border px-4 py-2'>{client.email}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </Layout>
  )
}

export default Index;

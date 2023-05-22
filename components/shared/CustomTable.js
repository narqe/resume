import { useMutation } from '@apollo/client';
import React from 'react'
import Swal from 'sweetalert2';
import { DELETE_CLIENT } from '../../GraphQL/Mutations/Client';
import { DELETE_PRODUCT } from '../../GraphQL/Mutations/Product';
import { GET_CLIENT_SELLERS } from '../../GraphQL/Queries/Client';
import { GET_PRODUCTS } from '../../GraphQL/Queries/Product';
import Router from 'next/router'
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin2Line } from "react-icons/ri";
import CurrencyNumber from './CurrencyNumber';
import Loading from './Loading';

const CustomTable = ({ data, ctx, loading = false, error = false }) => {
  const [ deleteClient ] = useMutation(DELETE_CLIENT, {
    update(cache, { data: { deleteClient } }) {
      const { getClientsVendedor } = cache.readQuery({ query: GET_CLIENT_SELLERS})
      const email = deleteClient.replace(' was deleted', '')

      cache.writeQuery({
        query: GET_CLIENT_SELLERS,
        data: {
          getClientsVendedor: getClientsVendedor.filter(current => current.email !== email)
        }
      })
    }
  })

  const [ deleteProduct ] = useMutation(DELETE_PRODUCT, {
    update(cache, { data: { deleteProduct } }) {
      const { getAllProducts } = cache.readQuery({ query: GET_PRODUCTS})
      const id = deleteProduct.replace(' was deleted', '')

      cache.writeQuery({
        query: GET_PRODUCTS,
        data: {
          getAllProducts: getAllProducts.filter(current => current.id !== id)
        }
      })
    }
  })

  const thead = data?.length ? Object.keys(data[0]) : [];

  if (loading) return (<Loading />);
  if (error) return ('Error, intente nuevamente');
  if(!thead?.length) return ('Empty state')

  const confirmDelete = (id) => {
    Swal.fire({
      title: `¿Está seguro que desea eliminar este ${ctx}?`,
      text: "Esta acción no puede deshacerse",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo'
    }).then(async (result) => {
      if (result.value) {
        try {
          if(ctx === 'Product'){
            const { data } = await deleteProduct({
              variables: { id }
            })
          } else if (ctx === 'Client') {
            const { data } = await deleteClient({
              variables: { id }
            })
          }
          Swal.fire(
            contextRead(data),
            `El ${ctx} fue eliminado correctamente`,
            'success'
          )
        } catch (error) {
          console.log(error);
        }
      }
    })
  }

  const contextRead = (data) => {
    switch (ctx) {
      case 'product':
        return data.deleteProduct;
    
      default:
        return data.deleteClient;
    }
  }
  
  const editElement = id => {
    const ctxLower = ctx.toLowerCase();
    Router.push({
      pathname: `/edit-${ctxLower}/[id]`,
      query: { 
        id 
      }
    })
  }

  const qtyZero = (qty) => {
    return (ctx === 'Product' && qty === 0) && "bg-yellow-50 text-red-500 font-bold border-b-2 border-yellow-500"
  }

  const isCurrencyField = (item, th) => {
    return (th === 'price' || th === 'total') 
      ? <CurrencyNumber value={item[th]} /> 
      : item[th];
  }

  return (
    <div className='overflow-x-scroll mb-10'>
      <table className='table-auto shadow-md mt-10 w-full w-lg'>
        <thead className='bg-gray-800'>
          <tr className='text-white'>
            { thead.map((th, i) => {
                if(!th.startsWith('__') && th !== 'id') {
                  return <th className='w-1/5 py-2' key={th+i}>{ th.toUpperCase() }</th> 
                }
              })
            }
            <th className='w-1/5 py-2'>ACTIONS</th> 
          </tr>
        </thead>
        <tbody className='bg-white'>
          { data.map(item => (
              <tr key={item.id} className={`${ qtyZero(item.quantity) }`}>
                { thead.map((th, i) => {
                    if(!th.startsWith('__') && th !== 'id') {
                      return (
                        <td className={ `border px-4 py-2` } key={i+item.id}>
                          { isCurrencyField(item, th) }
                        </td>
                      )
                    }
                  })
                }
                <td className='border-t flex justify-between gap-1 items-center px-4 py-2'>
                  <button 
                    type='button' 
                    className='flex justify-center items-center text-red-500 py-2 px-4 w-full text-lg font-bold'
                    onClick={() => confirmDelete(item.id)}>
                      <RiDeleteBin2Line className='mx-2' />
                  </button>
                  <button 
                    type='button' 
                    className='flex justify-center items-center text-blue-500 py-2 px-4 w-full text-lg font-bold'
                    onClick={() => editElement(item.id)}>
                      <CiEdit className='mx-2' />
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default CustomTable;
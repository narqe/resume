import { useMutation } from '@apollo/client';
import React from 'react'
import Swal from 'sweetalert2';
import { DELETE_CLIENT, DELETE_PRODUCT } from '../GraphQL/Mutations';
import { GET_CLIENT_SELLERS, GET_PRODUCTS } from '../GraphQL/Queries';
import Router from 'next/router'
import { CiCircleRemove, CiEdit } from "react-icons/ci";

const CustomTable = ({ data, ctx }) => {
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
        return data.deleteProduct
    
      default:
        return data.deleteClient
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

  const markQtyZero = (qty) => {
    return (ctx === 'Product' && qty === 0) && " bg-gray-200 text-gray-400 "
  }

  const btnQtyZero = (qty) => {
    return (ctx === 'Product' && qty === 0) && " animate-pulse opacity-70 "
  }

  const addCurrencyFormatPrefix = (item) => {
    return (item === 'price' || item === 'total') ? "$" : ""
  }

  const addCurrencyFormatSuffix = (item) => {
    return (item === 'price' || item === 'total') ? "ARS" : ""
  }

  return (
    <div className='overflow-x-scroll'>
      <table className='table-auto shadow-md mt-10 w-full w-lg'>
        <thead className='bg-gray-800'>
          <tr className='text-white'>
            { thead.map((th, i) => {
                if(!th.startsWith('__') && th !== 'id') {
                  return <th className='w-1/5 py-2' key={th+i}>{ th.toUpperCase() }</th> 
                }
              })
            }
            <th className='w-1/5 py-2'>DELETE</th> 
            <th className='w-1/5 py-2'>EDIT</th> 
          </tr>
        </thead>
        <tbody className='bg-white'>
          { data.map(item => (
              <tr key={item.id} className={`${markQtyZero(item.quantity)}`}>
                { thead.map((th, i) => {
                    if(!th.startsWith('__') && th !== 'id') {
                      return (
                        <td className={ `border px-4 py-2` } key={i+item.id}>
                          { `${addCurrencyFormatPrefix(th)}${item[th]} ${addCurrencyFormatSuffix(th)}` }
                        </td>
                      )
                    }
                  })
                }
                <td className='border px-4 py-2'>
                  <button 
                    type='button' 
                    className={ `flex justify-center items-center bg-red-500 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold` }
                    onClick={() => confirmDelete(item.id)}>
                    DELETE
                    <CiCircleRemove className='mx-2' />
                  </button>
                </td>
                <td className='border px-4 py-2'>
                  <button 
                    type='button' 
                    className={ `flex justify-center items-center bg-green-500 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold ${btnQtyZero(item.quantity)}` }
                    onClick={() => editElement(item.id)}>
                    EDIT
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

export default CustomTable
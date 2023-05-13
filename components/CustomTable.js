import React from 'react'

const CustomTable = ({ data }) => {
  const thead = Object.keys(data[0]);

  return (
    <table className='table-auto shadow-md mt-10 w-full w-lg'>
      <thead className='bg-gray-800'>
        <tr className='text-white'>
          { thead.map(th => {
              if(!th.startsWith('__') && th !== 'id') {
                return <th className='w-1/5 py-2' key={th}>{ th }</th> 
              }
            })
          }
        </tr>
      </thead>
      <tbody className='bg-white'>
        { data.map(item => (
            <tr key={item.id}>
              { thead.map(th => {
                  if(!th.startsWith('__') && th !== 'id') {
                    return <td className='border px-4 py-2'>{item[th]}</td>
                  }
                })
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

export default CustomTable
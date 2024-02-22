import { IconButton } from '@mui/material';
import { useState } from 'react'



export const TableRutas = ({ mostrarRutas, data}) => {

    const actualizarMostrarRutas = (value) => {
        setMostrarRutas(value);
    }


    return (
        <div className='w-full flex flex-col mt-8' >
        <div className='w-full overflow-x-auto rounded-lg'>
            <div className='align-middle inline-block w-full'>
                <div className='w-full shadow overflow-hidden sm:rounded-lg'>
                    <table className='w-full divide-y divide-gray-200'>
                        <thead className='bg-gray-50'>
                            <tr>
                                <th
                                scope='col'
                                className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                Código Ruta   
                                </th>
                                <th
                                scope='col'
                                className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                Ruta   
                                </th>
                                <th
                                scope='col'
                                className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                Cobrador
                                </th>
                                
                            </tr>
                        </thead>
                        <tbody className='bg-white'>
                            {data.map((item) => (
                                <tr key={item?.codigo}>
                                    <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900'>
                                        {item?.codigoRuta}
                                    </td>
                                    <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900'>
                                        {item?.ruta}
                                    </td>
                                    <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900'>
                                        {item?.cobradorRuta}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    )
}
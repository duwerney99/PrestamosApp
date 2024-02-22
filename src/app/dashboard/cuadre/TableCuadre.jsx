import { IconButton } from '@mui/material';
import { useState } from 'react'


export const TableCuadre = ({ mostrarCuadre, data}) => {
    
    const actualizarMostrarCuadre = (value) => {
        setMostrarCuadre(value);
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
                                Liquidacion   
                                </th>
                                <th
                                scope='col'
                                className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                Fecha Liquidacion   
                                </th>
                                <th
                                scope='col'
                                className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                Codigo Cobrador
                                </th>
                                <th
                                scope='col'
                                className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                Base liquidacion   
                                </th>
                                <th
                                scope='col'
                                className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                Fecha Desde   
                                </th>
                                <th
                                scope='col'
                                className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                Fecha Hasta   
                                </th>
                                <th
                                scope='col'
                                className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                Dias Liquidados   
                                </th>
                            </tr>
                        </thead>
                        <tbody className='bg-white'>
                            {data.map((item) => (
                                <tr key={item?.codigo}>
                                    <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900'>
                                        {item?.liquidacion}
                                    </td>
                                    <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900'>
                                        {item?.fechaLiquidacion}
                                    </td>
                                    <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900'>
                                        {item?.codigoCobrador}
                                    </td>
                                    <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900'>
                                        {item?.baseLiquidacion}
                                    </td>
                                    <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900'>
                                        {item?.fechaDesde}
                                    </td>
                                    <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900'>
                                        {item?.fechaHasta}
                                    </td>
                                    <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900'>
                                        {item?.diasLiquidados}
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
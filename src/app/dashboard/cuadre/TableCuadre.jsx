import { IconButton } from '@mui/material';
import { useState } from 'react'


export const TableCuadre = ({ mostrarCrearCuadre, data}) => {
    
    const actualizarMostrarCrearCuadre = (value) => {
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
                                Codigo Ruta   
                                </th>
                                <th
                                scope='col'
                                className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                Fecha Liquidacion   
                                </th>
                                <th
                                scope='col'
                                className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                Nombre Ruta
                                </th>
                                <th
                                scope='col'
                                className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                Base Anterior   
                                </th>
                                <th
                                scope='col'
                                className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                Total Cobrado
                                </th>
                                <th
                                scope='col'
                                className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                Prestamos   
                                </th>
                                <th
                                scope='col'
                                className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                Gastos   
                                </th>
                                <th
                                scope='col'
                                className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                Intereses   
                                </th>
                                <th
                                scope='col'
                                className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                Total Base   
                                </th>
                            </tr>
                        </thead>
                        <tbody className='bg-white'>
                            {data.map((item) => (
                                <tr key={item?.codigo}>
                                    <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900'>
                                        {item?.codigo}
                                    </td>
                                    <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900'>
                                        {item?.fecha}
                                    </td>
                                    <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900'>
                                        {item?.ruta}
                                    </td>
                                    <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900'>
                                        {item?.baseAnterior}
                                    </td>
                                    <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900'>
                                        {item?.totalCobre}
                                    </td>
                                    <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900'>
                                        {item?.prestamo}
                                    </td>
                                    <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900'>
                                        {item?.gastos}
                                    </td>
                                    <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900'>
                                        {item?.intereses}
                                    </td>
                                    <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900'>
                                        {item?.base}
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
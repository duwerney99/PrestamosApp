import { IconButton } from '@mui/material';
import PencilSquareIcon from '@heroicons/react/24/solid/PencilSquareIcon';


export const colorIcon = '#84cc16';

export const TablePrestamo = ({mostrarCrearPrestamo, data}) => { 
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
                                    Código   
                                    </th>
                                    <th
                                    scope='col'
                                    className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                    Saldo actual   
                                    </th>
                                    <th
                                    scope='col'
                                    className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                    Valor abono   
                                    </th>
                                    <th
                                    scope='col'
                                    className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                    Fecha prestamo   
                                    </th>
                                    <th
                                    scope='col'
                                    className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                    Intereses   
                                    </th>
                                    <th
                                    scope='col'
                                    className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                    Dias pago   
                                    </th>
                                    <th
                                    scope='col'
                                    className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                    Estado   
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
                                            {item?.saldoActual}
                                        </td>
                                        <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900'>
                                            {item?.valorAbono}
                                        </td>
                                        <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900'>
                                            {item?.fechaPrestamo}
                                        </td>
                                        <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900'>
                                            {item?.Intereses}
                                        </td>
                                        <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900'>
                                            {item?.diasPago}
                                        </td>
                                        <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900'>
                                            {item?.estado}
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
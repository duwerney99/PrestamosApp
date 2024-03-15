import { IconButton } from '@mui/material';
import firebase from 'firebase/app';
import 'firebase/firestore';
import PencilSquareIcon from '@heroicons/react/24/solid/PencilSquareIcon';



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
                                    Nombre Cliente   
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
                                    Fecha Vencimiento   
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
                                    
                                </tr>
                            </thead>
                            <tbody className='bg-white'>
                                {data.map((item) => (
                                    <tr key={item?.codigo}>
                                        <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900'>
                                            {item?.codigo}
                                        </td>
                                        <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900'>
                                            {item?.nombre}
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
                                            {item?.vencimientoPrestamo}
                                        </td>
                                        <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900'>
                                            {item?.intereses}
                                        </td>
                                        <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900'>
                                            {item?.diasPago}
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
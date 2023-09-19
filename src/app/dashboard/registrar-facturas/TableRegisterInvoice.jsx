'use client'

import { IconButton } from '@mui/material';
import PencilSquareIcon from '@heroicons/react/24/solid/PencilSquareIcon';
import { useSelector } from 'react-redux';

export const colorIcon = '#0284c7';

export const TableRegisterInvoice = ({showCreateInvoice, editInvoiceTable}) => {

    const invoiceReducer = useSelector((state) => state.invoiceReducer);

    const handleClick = (item) => {
        editInvoiceTable(true, item);
    };

    return (
        <div className='w-full flex flex-col mt-8'>
            <div className='w-full overflow-x-auto rounded-lg'>
                <div className='align-middle inline-block w-full'>
                    <div className='w-full shadow overflow-hidden sm:rounded-lg'>
                        <table className='w-full divide-y divide-gray-200'>
                            <thead className='bg-gray-50'>
                                <tr>
                                    <th
                                        scope='col'
                                        className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                        Número Factura
                                    </th>
                                    <th
                                        scope='col'
                                        className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                        Fecha Factura
                                    </th>
                                    <th
                                        scope='col'
                                        className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                        Monto
                                    </th>
                                    <th
                                        scope='col'
                                        className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='bg-white'>
                                {invoiceReducer.facturas.map((item) => (
                                    <tr key={item?.numeroFactura}>
                                        <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900'>
                                            {item?.numeroFactura}
                                        </td>
                                        <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900'>
                                            {item?.fechaFactura}
                                        </td>
                                        <td className='p-4 whitespace-nowrap text-sm font-semibold text-gray-900'>
                                            $ {item?.monto} 
                                        </td>
                                        <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900'>
                                            <IconButton disabled={showCreateInvoice} onClick={() => handleClick(item)} aria-label="Editar">
                                                <PencilSquareIcon color={colorIcon} width={20} height={20}/>
                                            </IconButton> 
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
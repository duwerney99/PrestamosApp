import { IconButton } from '@mui/material';
import PencilSquareIcon from '@heroicons/react/24/solid/PencilSquareIcon';
import { useSelector } from 'react-redux';

export const colorIcon = '#0284c7';

export const TableProduct = ({showCreateProduct, editProductTable}) => {
    const productReducer = useSelector((state) => state.productReducer)

    const handleClick = (item) => {
        editProductTable(true, item);
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
                                        Código
                                    </th>
                                    <th
                                        scope='col'
                                        className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                        Nombre
                                    </th>
                                    <th
                                        scope='col'
                                        className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                        Costo
                                    </th>
                                    <th
                                        scope='col'
                                        className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                        Valor Venta
                                    </th>
                                    <th
                                        scope='col'
                                        className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                        Total Productos
                                    </th>
                                    <th
                                        scope='col'
                                        className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='bg-white'>
                                {productReducer.productos.map((item) => (
                                    <tr key={item?.codigo}>
                                        <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900'>
                                            {item?.codigo}
                                        </td>
                                        <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-500'>
                                            {item?.nombre}
                                        </td>
                                        <td className='p-4 whitespace-nowrap text-sm font-semibold text-gray-900'>
                                            $ {item?.costo} 
                                        </td>
                                        <td className='p-4 whitespace-nowrap text-sm font-semibold text-gray-900'>
                                            $ {item?.valorVenta} 
                                        </td>
                                        <td className='p-4 whitespace-nowrap text-sm font-semibold text-gray-900'>
                                            {item?.totalProductos} 
                                        </td>
                                        <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900'>
                                            <IconButton disabled={showCreateProduct} onClick={() => handleClick(item)} aria-label="Editar">
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
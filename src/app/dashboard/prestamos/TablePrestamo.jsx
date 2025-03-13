import { useState, useEffect } from 'react';


import { ModalEdit } from "./ModalEdit"
import 'firebase/firestore';
import { TablePagination } from '@mui/material';

export const colorIcon = '#84cc16';


export const TablePrestamo = ({ mostrarCrearPrestamo, data }) => {
    const [modalAbierto, setModalAbierto] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const dataPaginated = data.slice(page * rowsPerPage, (page + 1) * rowsPerPage);


    const handleClick = (item) => {
        setModalAbierto(true);
    };

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
                                        Valor a Pagar
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
                                {dataPaginated.map((item) => (
                                    <tr key={item?.codigo}>
                                        <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900'>
                                            {item?.codigo}
                                        </td>
                                        <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900'>
                                            {item?.nombre}
                                        </td>
                                        <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900'>
                                            {item?.valorAPagar}
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
                                        {/* <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900'>
                                            <IconButton disabled={mostrarCrearPrestamo} onClick={() => handleClick(item)} aria-label="Editar">
                                            <PencilSquareIcon color={colorIcon} width={20} height={20}/>
                                            </IconButton> 
                                        </td> */}
                                        {modalAbierto && (
                                            <ModalEdit onClose={() => setModalAbierto(false)} data={data} />
                                        )}

                                    </tr>

                                ))}
                            </tbody>
                        </table>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]} // Opciones de filas por página
                            component="div"
                            count={data.length} // Cantidad total de datos
                            rowsPerPage={rowsPerPage} // Cantidad de filas por página
                            page={page} // Página actual
                            onPageChange={(event, newPage) => setPage(newPage)} // Cambio de página
                            onRowsPerPageChange={(event) => {
                                setRowsPerPage(parseInt(event.target.value, 10));
                                setPage(0); // Reiniciar a la primera página
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
import { IconButton } from '@mui/material';
import { useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


export const TableLiquidacion = ({ mostrarLiquidacion, data }) => {

    const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
    console.log("fecha selecionada ", fechaSeleccionada)


    const actualizarMostrarLiquidacion = (value) => {
        setMostrarLiquidacion(value);
    }

    const handleFechaSeleccionadaChange = (date) => {
        setFechaSeleccionada(date);
    };
    console.log("data ", data)
    const dataFiltrada = data.filter(item => {
        
        const fechaLiquidacion = new Date(item.fechaLiquidacion);
        return fechaLiquidacion.toISOString().slice(0, 10) === fechaSeleccionada.toISOString().slice(0, 10);
    });


    return (
        <div className='w-full flex flex-col mt-8' >
            <div className='w-full flex justify-end mb-4'>

                <DatePicker
                    selected={fechaSeleccionada}
                    onChange={handleFechaSeleccionadaChange}
                    dateFormat="dd/MM/yyyy" // Define el formato de fecha que deseas
                    showYearDropdown // Muestra un menú desplegable para seleccionar el año
                    showMonthDropdown // Muestra un menú desplegable para seleccionar el mes
                    scrollableYearDropdown // Permite desplazar el menú desplegable del año
                />
            </div>
            <div className='w-full overflow-x-auto rounded-lg'>
                <div className='align-middle inline-block w-full'>
                    <div className='w-full shadow overflow-hidden sm:rounded-lg'>
                        <table className='w-full divide-y divide-gray-200'>
                            <thead className='bg-gray-50'>
                                <tr>
                                    <th
                                        scope='col'
                                        className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                        Código Liquidacion
                                    </th>
                                    <th
                                        scope='col'
                                        className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                        Fecha Liquidacion
                                    </th>
                                    <th
                                        scope='col'
                                        className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                        Codigo Cliente
                                    </th>
                                    <th
                                        scope='col'
                                        className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                        Nombre Cliente
                                    </th>
                                    <th
                                        scope='col'
                                        className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                        Ruta
                                    </th>
                                    <th
                                        scope='col'
                                        className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                        Valor Abono
                                    </th>
                                    <th
                                        scope='col'
                                        className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                        Saldo Actual
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
                                            {item?.fechaLiquidacion}
                                        </td>
                                        <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900'>
                                            {item?.codigoCliente}
                                        </td>
                                        <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900'>
                                            {item?.nombreCliente}
                                        </td>
                                        <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900'>
                                            {item?.codigoRuta}
                                        </td>
                                        <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900'>
                                            {item?.valorAbono}
                                        </td>
                                        <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900'>
                                            {item?.saldoObtener}
                                        </td>
                                        <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900'>
                                            {item?.fechaPrestamo}
                                        </td>
                                        <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900'>
                                            {item?.fechaVencimiento}
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
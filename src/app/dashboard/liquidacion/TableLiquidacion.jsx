import { useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from 'react-redux';


export const TableLiquidacion = ({ mostrarLiquidacion, data, cambiarFecha }) => {

    console.log("Data ", data)

    const liquidReducers = useSelector((state) => state.liquidReduce.liquidReduce);

    // var codigoCliente = '';

    // const clienteIndex = data.map((item) => {
    //     codigoCliente = item.codigoCliente;

    //     return codigoCliente
    // });

    // console.log("clienteIndex", clienteIndex)

    // console.log("liquid", liquidReducers)
    // const existingClientIndex = liquidReducers.findIndex(liquidItem => liquidItem.codigoCliente === codigoCliente);
    // console.log("existingClientIndex", existingClientIndex);

    

    const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
   


    const actualizarMostrarLiquidacion = (value) => {
        setMostrarLiquidacion(value);
    }

    const handleFechaSeleccionadaChange = (date) => {
        const fechaFormateada = new Date(date);
        fechaFormateada.setHours(fechaFormateada.getHours());
        setFechaSeleccionada(date);
        cambiarFecha(date);
    };

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
                                    <tr key={item.codigo}>
                                        <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900'>
                                            {item.codigo}
                                        </td>
                                        <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900'>
                                            {item.fechaLiquidacion}
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
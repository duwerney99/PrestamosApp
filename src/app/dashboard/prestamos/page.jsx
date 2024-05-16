'use client'
import { PRESTAMOS } from "@firebase/services/references"
import { FormPrestamo } from "./FormPrestamo"
import { TablePrestamo } from "./TablePrestamo"
import { useEffect, useState } from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { consultarPrestamos } from "@firebase/services/prestamos"
import { RUTAS } from '@firebase/services/references';
import { consultarRutas } from '@firebase/services/rutas';



export default function Page() {
    const [mostrarCrearPrestamo, setMostrarCrearPrestamo] = useState(false);
    const [dataPrestamo, setDataPrestamo] = useState([]);
    const [rutas, setRutas] = useState([]);
    const [dataPrestamoStatic, setDataPrestamoStatic] = useState([]);

    useEffect(() => {
        async function fetchPrestamo() {
            const response = await consultarPrestamos(PRESTAMOS);
            if (response.data) {
                console.log("dataaaa ", response.data)
                const sortedClientes = response.data.sort((a, b) => a.codigo - b.codigo);
                setDataPrestamo(sortedClientes);
                setDataPrestamoStatic(sortedClientes);
            }
            
            const resultRuta = await consultarRutas(RUTAS); 
            if (resultRuta.statusResponse) {
                setRutas(resultRuta.data);
            } else {
                console.error(resultRuta.error);
            }
        }
        fetchPrestamo();
    }, []);



    const onChange = (e) => {
        const value = e.target.value
        
        const dataFiltrada = dataPrestamoStatic.filter((prestamo) => prestamo.nombreRuta === value)

        setDataPrestamo(dataFiltrada)
    }



    const actualizarMostrarCrearPrestamo = (value) => {
        setMostrarCrearPrestamo(value);
    }



    return (
        <div>
            <div className='pt-6 px-4 justify-center items-center'>
                {mostrarCrearPrestamo && <FormPrestamo dataPrestamo={dataPrestamo} setDataPrestamo={setDataPrestamo} actualizarMostrarCrearPrestamo={actualizarMostrarCrearPrestamo} />}
            </div>
            <div className='pt-6 px-4'>
                <div className='w-full grid grid-cols-1 2xl:grid-cols-1 xl:gap-4 my-4'>
                    <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 '>
                        <div className='mb-4 flex items-center justify-between'>
                            <div>
                                <h3 className='text-xl font-bold text-gray-900 mb-2'>Prestamos</h3>
                                <h2>{dataPrestamo.map((data) => parseFloat(data.valorAPagar)).reduce((acomuldor, saldo) => acomuldor + saldo, 0)}</h2>
                                <FormControl fullWidth>
                                    <InputLabel>Rutas</InputLabel>
                                    <Select
                                        label="rutas"
                                        name='rutas'
                                        variant="outlined"
                                        size="small"
                                        style={{ marginRight: '1rem' }}   
                                        onChange={onChange}
                                        
                                    >
                                        {rutas.map((ruta) => (
                                            <MenuItem key={ruta.id} value={ruta.ruta}>
                                                {ruta.ruta}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className='flex-shrink-0'>
                                <button disabled={mostrarCrearPrestamo}
                                    onClick={() => setMostrarCrearPrestamo(true)}
                                    className={`text-lg font-medium ${mostrarCrearPrestamo ? 'text-gray-500' : 'text-green-400 hover:bg-gray-100'
                                        } rounded-lg p-2`}>
                                    Crear Prestamo
                                </button>

                            </div>
                        </div>
                        {dataPrestamo && dataPrestamo.length > 0 && <TablePrestamo mostrarCrearPrestamo={mostrarCrearPrestamo} data={dataPrestamo} />}
                    </div>
                </div>
            </div>
        </div>
    )
}
'use client'
import { PRESTAMOS } from "@firebase/services/references"
import { FormPrestamo } from "./FormPrestamo"
import { TablePrestamo } from "./TablePrestamo"
import { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { consultarPrestamos } from "@firebase/services/clientes"



const data = [
    {
        codigo: "0001",
        nombreCliente: "Santiago",
        saldoActual: "200000",
        saldo: 10000,
        valorAbono: 2500,
        abono: 2000,
        diasPago: "Semanal",
        Intereses: "En mora",
        fechaPrestamo: "3012347145",
        plazos: 'sabntiago@gmail.com',
        cuotas: '5',
        estado: "Inactivo"
    },
    {
        codigo: "0002",
        nombreCliente: "Santiago",
        saldo: 5000,
        valorAbono: "2500",
        saldoActual: "400000",
        abono: 3000,
        diasPago: "15nal",
        Intereses: "5000",
        fechaPrestamo: "3012347145",
        plazos: 'sabntiago@gmail.com',
        cuotas: '5',
        estado: "Inactivo"
    },
    {
        codigo: "0003",
        nombreCliente: "Santiago",
        saldo: 15000,
        valorAbono: 2500,
        saldoActual: "800000",
        abono: 10000,
        diasPago: "Mensual",
        Intereses: "40000",
        fechaPrestamo: "3012347145",
        plazos: 'sabntiago@gmail.com',
        cuotas: '5',
        estado: "Inactivo"
    }]



export default function Page () {
    const [mostrarCrearPrestamo, setMostrarCrearPrestamo] = useState(false);
    const [dataPrestamo, setDataPrestamo] = useState([]);

    useEffect(() => {
        async function fetchPrestamo() {
            const response = await consultarPrestamos(PRESTAMOS);
            if (response.data) setDataPrestamo(response.data);
        }
        fetchPrestamo();
    }, []);

    const actualizarMostrarCrearPrestamo = (value) => {
        setMostrarCrearPrestamo(value);
    }



    return (
        <div>
            <div className='pt-6 px-4 justify-center items-center'>
                { mostrarCrearPrestamo && <FormPrestamo dataPrestamo={dataPrestamo} setDataPrestamo={setDataPrestamo} actualizarMostrarCrearPrestamo={actualizarMostrarCrearPrestamo}/>}
            </div>
            <div className='pt-6 px-4'>
                <div className='w-full grid grid-cols-1 2xl:grid-cols-1 xl:gap-4 my-4'>
                        <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 '>
                            <div className='mb-4 flex items-center justify-between'>
                                <div>
                                    <h3 className='text-xl font-bold text-gray-900 mb-2'>Prestamos</h3>
                                </div>
                                <div className='flex-shrink-0'>
                                    <button disabled={mostrarCrearPrestamo} 
                                        onClick={() => setMostrarCrearPrestamo(true)}
                                        className={`text-lg font-medium ${
                                            mostrarCrearPrestamo ? 'text-gray-500' : 'text-green-400 hover:bg-gray-100'
                                        } rounded-lg p-2`}>
                                        Crear Prestamo
                                    </button>
                                    
                                </div>
                            </div>
                            { dataPrestamo && dataPrestamo.length > 0 && <TablePrestamo mostrarCrearPrestamo={mostrarCrearPrestamo} data={dataPrestamo}/>}
                        </div>
                </div>
            </div>
        </div> 
    )
}
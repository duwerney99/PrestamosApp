'use client'

import { FormLiquidacion } from "./FormLiquidacion"
import { TableLiquidacion } from "./TableLiquidacion"
import { Button } from '@mui/material'
import { useState } from 'react'



export default function  Page () {
    const [mostrarLiquidacion, setMostrarLiquidacion] = useState(true);
    
    const data = [
        {
            codigoRuta: "0001",
            ruta: "Santiago",
            fechaLiquidacion: "200000",
            codigoCliente: 10000,
            valorAbono: 2500,
            cliente: 2000,
            saldoActual: "En mora",
            fechaPrestamo: "3012347145",
            fechaVencimiento: 'sabntiago@gmail.com',
        },
        {
            codigoRuta: "0001",
            ruta: "Santiago",
            fechaLiquidacion: "200000",
            codigoCliente: 10000,
            cliente: 2000,
            valorAbono: "Semanal",
            saldoActual: "En mora",
            fechaPrestamo: "3012347145",
            fechaVencimiento: 'sabntiago@gmail.com',

        },
        {
            codigoRuta: "0001",
            ruta: "Santiago",
            fechaLiquidacion: "200000",
            codigoCliente: 10000,
            cliente: 2000,
            valorAbono: "Semanal",
            saldoActual: "En mora",
            fechaPrestamo: "3012347145",
            fechaVencimiento: 'sabntiago@gmail.com',
        }]
    

    return (
        <div>
            <div className='pt-6 px-4 justify-center items-center'>
                { mostrarLiquidacion && <FormLiquidacion actualizarMostrarLiquidacion={mostrarLiquidacion}/>}
            </div>
            <div className='pt-6 px-4'>
                <div className='w-full grid grid-cols-1 2xl:grid-cols-1 xl:gap-4 my-4'>
                <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 '>
                            <div className='mb-4 flex items-center justify-between'>
                                <div>
                                    <h3 className='text-xl font-bold text-gray-900 mb-2'>Liquidacion</h3>
                                </div>
                                <div className='flex-shrink-0'>
                                    <button  
                                        className={`text-lg font-medium 'text-green-400 hover:bg-gray-100' rounded-lg p-2`}>
                                        Crear Liquidacion
                                    </button>
                                    
                                </div>
                            </div>
                            <TableLiquidacion mostrarLiquidacion={mostrarLiquidacion} data={data}/>
                        </div>
                </div>
            </div>    
        </div>
    )
}
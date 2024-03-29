'use client'

import { FormCuadre } from "./FormCuadre"
import { TableCuadre } from "./TableCuadre"
import { Button } from '@mui/material'
import { useState } from 'react'



export default function page () {
    const [mostrarCuadre, setMostrarCuadre] = useState(true);
    const data = [
        {
            liquidacion: 1,
            fechaLiquidacion: "21/02/2024",
            codigoCobrador: 10000,
            baseLiquidacion: 2500,
            fechaDesde: "21/02/2024",
            fechaHasta: "21/02/2024",
            diasLiquidados: 1
        },
    ]



    return (
        <div>
            <div className='pt-6 px-4 justify-center items-center'>
                { mostrarCuadre && <FormCuadre actualizarMostrarCuadre={mostrarCuadre}/>}
            </div>
            <div className='pt-6 px-4'>
                <div className='w-full grid grid-cols-1 2xl:grid-cols-1 xl:gap-4 my-4'>
                <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 '>
                            <div className='mb-4 flex items-center justify-between'>
                                <div>
                                    <h3 className='text-xl font-bold text-gray-900 mb-2'>Cuadre</h3>
                                </div>
                                <div className='flex-shrink-0'>
                                    <button  
                                        className={`text-lg font-medium 'text-green-400 hover:bg-gray-100' rounded-lg p-2`}>
                                        Crear Cuadre
                                    </button>
                                    
                                </div>
                            </div>
                            <TableCuadre mostrarCuadre={mostrarCuadre} data={data}/>
                        </div>
                </div>
            </div>    
        </div>
    )
}
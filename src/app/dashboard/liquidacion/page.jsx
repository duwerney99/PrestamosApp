'use client'

import { FormLiquidacion } from "./FormLiquidacion"
import { TableLiquidacion } from "./TableLiquidacion"
import { useState } from 'react'



export default function  Page () {
    const [mostrarLiquidacion, setMostrarLiquidacion] = useState(true);
    
    
    const actualizarMostrarLiquidacion = (value) => {
        setMostrarLiquidacion(value);
    } 

    return (
        <div>
            <div className='pt-6 px-4 justify-center items-center'>
                { mostrarCrearPrestamo && <FormLiquidacion actualizarMostrarLiquidacion={actualizarMostrarLiquidacion}/>}
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
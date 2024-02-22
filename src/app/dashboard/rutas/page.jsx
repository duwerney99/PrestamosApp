'use client'

import { FormRutas } from "./FormRutas"
import { TableRutas } from "./TableRutas"
import { Button } from '@mui/material'
import { useState } from 'react'


export default function Page () {
    const [mostrarRutas, setMostrarRutas] = useState(true);

    const data = [
        {
            codigoRuta: "01",
            ruta: "Santa Fe",
            cobradorRuta: "Leydi",
            
        },
    ]

    return (
        <div>
            <div className='pt-6 px-4 justify-center items-center'>
                { mostrarRutas && <FormRutas actualizarMostrarRutas={mostrarRutas}/>}
            </div>
            <div className='pt-6 px-4'>
                <div className='w-full grid grid-cols-1 2xl:grid-cols-1 xl:gap-4 my-4'>
                <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 '>
                            <div className='mb-4 flex items-center justify-between'>
                                <div>
                                    <h3 className='text-xl font-bold text-gray-900 mb-2'>Rutas</h3>
                                </div>
                                <div className='flex-shrink-0'>
                                    <button  
                                        className={`text-lg font-medium 'text-green-400 hover:bg-gray-100' rounded-lg p-2`}>
                                        Crear Ruta
                                    </button>
                                    
                                </div>
                            </div>
                            <TableRutas mostrarRutas={mostrarRutas} data={data}/>
                        </div>
                </div>
            </div>    
        </div>
    )
}
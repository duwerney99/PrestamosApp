'use client'

import { RUTAS } from "@firebase/services/references"
import { FormRutas } from "./FormRutas"
import { TableRutas } from "./TableRutas"
import { Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { consultarRutas } from "@firebase/services/clientes"


export default function Page () {
    const [mostrarCrearRutas, setMostrarCrearRutas] = useState(false);
    const [dataRutas, setDataRutas] = useState([]);


    useEffect(() => {
        async function fetchRuta() {
            const response = await consultarRutas(RUTAS);
            if (response.data) setDataRutas(response.data);
        }
        fetchRuta();
    }, []);


    const actualizarMostrarCrearRutra = (value) => {
        setMostrarCrearRutas(value);
    }

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
                { mostrarCrearRutas && <FormRutas dataRutas={dataRutas} setDataRutas={setDataRutas} actualizarMostrarCrearRutra={actualizarMostrarCrearRutra}/>}
            </div>
            <div className='pt-6 px-4'>
                <div className='w-full grid grid-cols-1 2xl:grid-cols-1 xl:gap-4 my-4'>
                <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 '>
                        <div className='mb-4 flex items-center justify-between'>
                            <div>
                                <h3 className='text-xl font-bold text-gray-900 mb-2'>Rutas</h3>
                            </div>
                            <div className='flex-shrink-0'>
                                <button  disabled={mostrarCrearRutas}
                                    onClick={() => setMostrarCrearRutas(true)} 
                                    className={`text-lg font-medium ${
                                        mostrarCrearRutas ? 'text-gray-500' : 'text-green-400 hover:bg-gray-100'
                                    } rounded-lg p-2`}>
                                    Crear Ruta
                                </button>
                                
                            </div>
                        </div>
                        { dataRutas && dataRutas.length > 0 && <TableRutas mostrarCrearRutas={mostrarCrearRutas} data={dataRutas}/>}
                    </div>
                </div>
            </div>    
        </div>
    )
}
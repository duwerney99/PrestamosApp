'use client'

import { CUADRE } from "@firebase/services/references"
import { FormCuadre } from "./FormCuadre"
import { TableCuadre } from "./TableCuadre"
import { Button } from '@mui/material'
import { useState, useEffect } from 'react'
import { consultarCuadres } from '@firebase/services/cuadre';


export default function page () {
    const [mostrarCuadre, setMostrarCrearCuadre] = useState(true);
    const [dataAMostrar, setDataAMostrar] = useState([]);


    useEffect(() => {
        async function fetchCuadre() {
            const response = await consultarCuadres(CUADRE);
            if (response.data) {
                const sortedClientes = response.data.sort((a, b) => a.codigo - b.codigo);
                console.log("dataaaa ", sortedClientes)
                setDataAMostrar(sortedClientes);
            }
            
        }
        fetchCuadre();
    }, []);



    const actualizarMostrarCrearCuadre = (value) => {
        setMostrarCrearCuadre(value);
    }

    

    return (
        <div>
            <div className='pt-6 px-4 justify-center items-center'>
                { mostrarCuadre && <FormCuadre actualizarMostrarCrearCuadre={actualizarMostrarCrearCuadre}/>}
            </div>
            <div className='pt-6 px-4'>
                <div className='w-full grid grid-cols-1 2xl:grid-cols-1 xl:gap-4 my-4'>
                <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 '>
                            <div className='mb-4 flex items-center justify-between'>
                                <div>
                                    <h3 className='text-xl font-bold text-gray-900 mb-2'>Cuadre</h3>
                                    
                                </div>
                                <div className='flex-shrink-0'>
                                    <button disabled={mostrarCuadre}
                                        onClick={() => setMostrarCrearCuadre(true)}
                                        className={`text-lg font-medium ${
                                            mostrarCuadre ? 'text-gray-500' : 'text-green-400 hover:bg-gray-100'
                                        } rounded-lg p-2`}>
                                        Crear Cliente
                                    </button>
                                    
                                </div>
                            </div>
                            <TableCuadre mostrarCuadre={mostrarCuadre} data={dataAMostrar}/>
                        </div>
                </div>
            </div>    
        </div>
    )
}
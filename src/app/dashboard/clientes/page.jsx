'use client'

import { CLIENTES } from "@firebase/services/references"
import { FormCreate } from "./FormCreate"
import { TableClient } from "./TableClient"
import { useEffect, useState } from 'react'
import { consultarClientes } from "@firebase/services/clientes"

export default function Page () {
    const [mostrarCrearCliente, setMostrarCrearCliente] = useState(false);
    const [dataCliente, setDataCliente] = useState([]);

    useEffect(() => {
        async function fetchCliente() {
            const response = await consultarClientes(CLIENTES, null);
            if (response.data) setDataCliente(response.data);
        }
        fetchCliente(); 
    }, []);

    const actualizarMostrarCrearCliente = (value) => {
        setMostrarCrearCliente(value);
    }
    
    return (
        <div>
            <div className='pt-6 px-4 justify-center items-center'>
                { mostrarCrearCliente && <FormCreate dataCliente={dataCliente} setDataCliente={setDataCliente} actualizarMostrarCrearCliente={actualizarMostrarCrearCliente}/>}
            
            </div>
            <div className='pt-6 px-4'>
                <div className='w-full grid grid-cols-1 2xl:grid-cols-1 xl:gap-4 my-4'>
                        <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 '>
                            <div className='mb-4 flex items-center justify-between'>
                                <div>
                                    <h3 className='text-xl font-bold text-gray-900 mb-2'>Clientes</h3>
                                </div>
                                <div className='flex-shrink-0'>
                                    <button disabled={mostrarCrearCliente}
                                        onClick={() => setMostrarCrearCliente(true)}
                                        className={`text-lg font-medium ${
                                            mostrarCrearCliente ? 'text-gray-500' : 'text-green-400 hover:bg-gray-100'
                                        } rounded-lg p-2`}>
                                        Crear Cliente
                                    </button>
                                    
                                </div>
                            </div>
                            { dataCliente && dataCliente.length > 0 && <TableClient mostrarCrearCliente={mostrarCrearCliente} data={dataCliente}/>}
                        </div>
                </div>
            </div>
        </div> 
    )
}

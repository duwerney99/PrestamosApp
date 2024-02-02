'use client'

import { FormCreate } from "./FormCreate"
import { TableClient } from "./TableClient"
import { useState } from 'react'

const data = [
    {
        codigo: "0001",
        nombre: "Santiago",
        apellido: "Hernandez",
        cedula: "1024455445",
        telefono: 3012347145,
        correoElectronico: 'sabntiago@gmail.com'
    },
    {
        codigo: "0002",
        nombre: "Santiago",
        apellido: "Hernandez",
        cedula: "1024455445",
        telefono: 3012347145,
        correoElectronico: 'sabntiago@gmail.com'
    },
    {
        codigo: "0003",
        nombre: "Santiago",
        apellido: "Hernandez",
        cedula: "1024455445",
        telefono: 3012347145,
        correoElectronico: 'sabntiago@gmail.com'
    }
]

export default function Page () {
    const [mostrarCrearCliente, setMostrarCrearCliente] = useState(true);

    const actualizarMostrarCrearCliente = (value) => {
        setMostrarCrearCliente(value);
    }
    
    return (
        <div>
            <div className='pt-6 px-4 justify-center items-center'>
                { mostrarCrearCliente && <FormCreate actualizarMostrarCrearCliente={actualizarMostrarCrearCliente}/>}
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
                            <TableClient mostrarCrearCliente={mostrarCrearCliente} data={data}/>
                        </div>
                </div>
            </div>
        </div> 
    )
}
